<script setup lang="ts">
import { ConsultOrderPreData } from '@/types/consult.js'
import { useConsultStore } from '@/stores/index.js'
import { onMounted, ref } from 'vue'
import { getConsultOrderPreviewAPI } from '@/services/consult.js'
import { Patient } from '@/types/user.js'
import { getPatientDetailAPI } from '@/services/user.js'

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

onMounted(() => {
  loadData()
  loadPatientInfo()
})

// 同意协议
const agree = ref(false)
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
    />
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
