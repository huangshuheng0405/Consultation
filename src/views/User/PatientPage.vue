<script setup lang="ts">
// 组件挂载完毕 获取数据
import { computed, onMounted, ref } from 'vue'
import { Patient, PatientList } from '@/types/user.d.js'
import { addPatientAPI, getPatientListAPI } from '@/services/user.js'
import { idCardRules, nameRules } from '@/utils/rules.js'
import { FormInstance, showConfirmDialog, showSuccessToast } from 'vant'

const patientInfoList = ref<PatientList>()

// 获取患者列表
const getPatientInfoList = async () => {
  const res = await getPatientListAPI()
  console.log(res)
  patientInfoList.value = res.data
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
const onShowPopup = () => {
  // 打开时重置表单数据
  patient.value = { ...initPatient }
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
  // 提交表单
  await addPatientAPI(patient.value)
  // 关闭弹出层 加载列表 成功提示
  show.value = false
  getPatientInfoList()
  showSuccessToast('添加成功')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div class="patient-item" v-for="item in patientInfoList" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">
            {{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}</span
          >
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}</span>
        </div>
        <div class="icon"><cp-icon name="user-edit" /></div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div
        class="patient-add"
        v-if="patientInfoList && patientInfoList.length < 6"
        @click="onShowPopup"
      >
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!--  popup  -->
    <van-popup position="right" :show="show">
      <cp-nav-bar
        title="添加患者"
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
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
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
