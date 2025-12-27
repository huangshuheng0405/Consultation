<script setup lang="ts">
import { useMobileCode } from '@/composables/index.js'
import { bindMobileAPI, loginByQQAPI } from '@/services/user.js'
import { useUserStore } from '@/stores/index.js'
import { User } from '@/types/user.js'
import { codeRules } from '@/utils/rules.js'
import { mobileRules } from '@/utils/rules.js'
import { showSuccessToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const openId = ref('')
const isNeedBind = ref(true)
onMounted(() => {
  if (QC.Login.check()) {
    QC.Login.getMe((id: string) => {
      openId.value = id
      console.log(openId.value)
      loginByQQAPI(id)
        .then((res) => {
          console.log(res)
          loginSuccess(res.data)
        })
        .catch((err) => {
          console.log(err)
          isNeedBind.value = true
        })
    })
  }
})
const mobile = ref('')
const code = ref()
const { onSendCode, time, form } = useMobileCode(mobile, 'bindMobile')
// 成功的逻辑
const userStore = useUserStore()
const router = useRouter()
const loginSuccess = (data: User) => {
  userStore.setUser(data)
  router.replace(userStore.returnUrl || '/user')
  showSuccessToast('登录成功')
  userStore.setReturnUrl('')
}
// 绑定手机
const onSubmit = async () => {
  const res = await bindMobileAPI({
    mobile: mobile.value,
    code: code.value,
    openId: openId.value
  })
  loginSuccess(res.data)
}
</script>

<template>
  <div class="login-page" v-if="isNeedBind">
    <cp-nav-bar></cp-nav-bar>
    <div class="login-head">
      <h3>手机绑定</h3>
    </div>
    <van-form autocomplete="off" ref="form" @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      ></van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #button>
          <span
            class="btn-send"
            :class="{ active: time > 0 }"
            @click="onSendCode"
            >{{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-button
          style="margin-top: 50px"
          block
          round
          type="primary"
          native-type="submit"
        >
          立即绑定
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<style scoped lang="scss">
@import '../../styles/login.scss';
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
