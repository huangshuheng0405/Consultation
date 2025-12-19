<script setup lang="ts">
// 组件挂载完毕 获取数据
import { computed, onMounted, ref } from 'vue'
import { Patient, PatientList } from '@/types/user.d.js'
import {
  addPatientAPI,
  deletePatientAPI,
  editPatientAPI,
  getPatientListAPI
} from '@/services/user.js'
import { idCardRules, nameRules } from '@/utils/rules.js'
import {
  FormInstance,
  showConfirmDialog,
  showSuccessToast,
  showToast
} from 'vant'
import { useRoute } from 'vue-router'
import { useConsultStore } from '@/stores/index.js'
import router from '@/router/index.js'

const patientInfoList = ref<PatientList>()

// 获取患者列表
const getPatientInfoList = async () => {
  const res = await getPatientListAPI()
  console.log(res)
  patientInfoList.value = res.data
  // 默认选择患者
  if (isChange.value && patientInfoList.value.length) {
    const defaultPatient = patientInfoList.value.find(
      (item) => item.defaultFlag === 1
    )
    if (defaultPatient) patientId.value = defaultPatient.id
    else patientId.value = patientInfoList.value[0].id
  }
}

// 组件挂在完毕时执行
onMounted(() => {
  getPatientInfoList()
})

// 表单性别
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

// 控制弹出层是否显示
const show = ref(false)

// 弹出层
const onShowPopup = (item?: Patient) => {
  if (item) {
    // 编辑信息
    const { id, name, idCard, gender, defaultFlag } = item
    // 表单回填
    patient.value = { id, name, idCard, gender, defaultFlag }
  } else {
    // 重置表单验证
    form.value?.resetValidation()
    // 添加信息
    // 打开时重置表单数据
    patient.value = { ...initPatient }
  }
  show.value = true
}

// 初始值表单数据
const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}

// 收集表单数据
const patient = ref<Patient>({ ...initPatient })

// 复选框绑定  不能直接用数字
const defaultFlag = computed({
  get: () => (patient.value.defaultFlag === 1 ? true : false),
  set: (value) => {
    patient.value.defaultFlag = value ? 1 : 0
  }
})

// 提交表单
const form = ref<FormInstance>()
const onSubmit = async () => {
  // 表单整体校验
  await form.value?.validate()
  // 性别校验
  // 取出身份证倒数第二位
  const gender = +patient.value.idCard.substr(-2, 1) % 2
  // console.log(gender)
  if (gender !== patient.value.gender) {
    await showConfirmDialog({
      title: '温馨提示',
      message: '填写的性别与身份证上的不一样\n您确认提交码',
      confirmButtonText: '确定'
    })
  }
  // 提交表单 提交 或者 编辑
  if (patient.value.id) {
    await editPatientAPI(patient.value)
  } else {
    await addPatientAPI(patient.value)
  }
  // 关闭弹出层 加载列表 成功提示
  show.value = false
  getPatientInfoList()
  showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
}

// 删除患者
const onRemove = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: `您确认删除 ${patient.value.name} 患者的信息吗?`
  })
  await deletePatientAPI(patient.value.id!)
  show.value = false
  getPatientInfoList()
  showSuccessToast('删除成功')
}

// 路由
const route = useRoute()

// 是否是选择患者
const isChange = computed(() => route.query.isChange === '1')

// 选择效果
const patientId = ref<string>()
const selectPatient = (item: Patient) => {
  if (isChange.value) {
    patientId.value = item.id
  }
}

// 仓库
const consultStore = useConsultStore()

// 下一步
const next = () => {
  if (!patientId.value) return showToast('请选择患者')
  consultStore.setPatientId(patientId.value)
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <!-- 头部提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>

    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in patientInfoList"
        :key="item.id"
        @click="selectPatient(item)"
        :class="{ selected: patientId === item.id }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">
            {{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}</span
          >
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}</span>
        </div>
        <div class="icon" @click.stop="onShowPopup(item)">
          <cp-icon name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div
        class="patient-add"
        v-if="patientInfoList && patientInfoList.length < 6"
        @click="onShowPopup()"
      >
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 底部按钮 -->
    <div class="patient-next" v-if="isChange" @click="next">
      <van-button type="primary" round block>下一步</van-button>
    </div>

    <!--  popup  -->
    <van-popup position="right" :show="show">
      <cp-nav-bar
        :title="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        :back="() => (show = false)"
        @click-right="onSubmit"
      >
      </cp-nav-bar>
      <!--  表单  -->
      <van-form autocomplete="off" ref="form">
        <van-field
          v-model="patient.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :rules="nameRules"
        />
        <van-field
          v-model="patient.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="idCardRules"
        />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn
              v-model="patient.gender"
              :options="options"
            ></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" :icon-size="18" round />
          </template>
        </van-field>
      </van-form>
      <!--   删除按钮   -->
      <van-action-bar v-if="patient.id">
        <van-action-bar-button text="删除" @click="onRemove" />
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}

//底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}

.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}

.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
</style>
