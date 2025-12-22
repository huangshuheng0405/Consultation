<script setup lang="ts">
import { ConsultOrderPreData, PartialConsult } from '@/types/consult.js'
import { useConsultStore } from '@/stores/index.js'
import { onMounted, ref } from 'vue'
import {
  createConsultOrderAPI,
  getConsultOrderPreviewAPI,
  getConsultOrderUrlAPI
} from '@/services/consult.js'
import { Patient } from '@/types/user.js'
import { getPatientDetailAPI } from '@/services/user.js'
import {
  showConfirmDialog,
  showDialog,
  showLoadingToast,
  showToast
} from 'vant'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

// 获取预支付信息
const payInfo = ref<ConsultOrderPreData>()
const consultStore = useConsultStore()
const loadData = async () => {
  const res = await getConsultOrderPreviewAPI({
    type: consultStore.consult.type,
    illnessType: consultStore.consult.illnessType
  })
  payInfo.value = res.data
  // 记录优惠券id
  consultStore.setCouponId(payInfo.value.couponId)
}
// 获取患者详情
const patientInfo = ref<Patient>()
const loadPatientInfo = async () => {
  if (!consultStore.consult.patientId) return
  const res = await getPatientDetailAPI(consultStore.consult.patientId)
  patientInfo.value = res.data
}

type key = keyof PartialConsult
onMounted(() => {
  const validKeys: key[] = [
    'type',
    'illnessType',
    'depId',
    'illnessDesc',
    'illnessTime',
    'consultFlag',
    'patientId'
  ]
  const valid = validKeys.every(
    (key) => consultStore.consult[key] !== undefined
  )
  if (!valid)
    return showDialog({
      title: '温馨提示',
      message:
        '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  loadData()
  loadPatientInfo()
})

// 同意协议
const agree = ref(false)

// 生成订单
const show = ref(false)
const paymentMethod = ref<0 | 1>()
const loading = ref(false)
const orderId = ref('')
const onSubmit = async () => {
  if (!agree.value) return showToast('请先阅读并同意协议')
  loading.value = true
  const res = await createConsultOrderAPI(consultStore.consult)
  loading.value = false
  consultStore.clearConsult()
  orderId.value = res.data.id
  show.value = true
}

// 用户引导
// 阻止返回上一页
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})

const router = useRouter()

const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = ''
      router.push('user/consult')
      return true
    })
}

// 支付逻辑
const pay = async () => {
  if (!paymentMethod.value) return showToast('请选择支付方式')
  showLoadingToast({
    message: '跳转支付',
    duration: 0
  })
  const res = await getConsultOrderUrlAPI({
    orderId: orderId.value,
    paymentMethod: paymentMethod.value,
    payCallBack: 'http://localhost:5173/room'
  })
  window.location.href = res.data.payUrl
}
// TODO 22
</script>

<template>
  <div class="consult-pay-page" v-if="patientInfo && payInfo">
    <cp-nav-bar title="支付" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo.pointDeduction}`" />
      <van-cell
        title="实付款"
        :value="`¥${payInfo.actualPayment}`"
        class="pay-price"
      />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patientInfo.name} | ${patientInfo.gender} | ${patientInfo.age}岁`"
      ></van-cell>
      <van-cell
        title="病情描述"
        :label="consultStore.consult.illnessDesc"
      ></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree"
        >我已同意 <span class="text">支付协议</span></van-checkbox
      >
    </div>
    <van-submit-bar
      button-type="primary"
      :price="payInfo.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
      @click="onSubmit"
      :loading="loading"
    />
    <!--  支付抽屉 控制面板  -->
    <van-action-sheet
      v-model:show="show"
      title="选择支付方式"
      :close-on-popstate="false"
      :closeable="false"
      :before-close="onClose"
    >
      <div class="pay-type">
        <p class="amount">￥ {{ payInfo.actualPayment.toFixed(2) }}</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="paymentMethod = 0">
            <template #icon><cp-icon name="consult-wechat" /></template>
            <template #extra
              ><van-checkbox :checked="paymentMethod === 0"
            /></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="paymentMethod = 1">
            <template #icon><cp-icon name="consult-alipay" /></template>
            <template #extra
              ><van-checkbox :checked="paymentMethod === 1"
            /></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button @click="pay" type="primary" round block
            >立即支付</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
  <div class="consult-pay-page" v-else>
    <cp-nav-bar title="支付" />
    <!--  骨架组件    -->
    <van-skeleton title :row="10" style="margin-top: 18px" :loading="true" />
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  :deep(.vam-cell__title) {
    font-size: 16px;
  }
  :deep(.van-cell__value) {
    font-size: 16px;
    color: var(--cp-price);
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
:deep(.van-submit-bar__button) {
  font-weight: normal;
  width: 160px;
}
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
