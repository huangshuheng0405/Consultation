<script setup lang="ts">
import { useMobileCode } from '@/composables/index.js'
import { loginByMobileAPI, loginByPasswordAPI } from '@/services/user.js'
import { useUserStore } from '@/stores/index.js'
import { codeRules, mobileRules, passwordRules } from '@/utils/rules.js'
import { showSuccessToast, showToast } from 'vant'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const onClickRight = () => {
  router.push('/register')
}

const mobile = ref('')
const password = ref('')
const agree = ref(false)

const userStore = useUserStore()

const route = useRoute()
// 提交表单
const onSubmit = async () => {
  // console.log(mobile.value, password.value)
  if (!agree.value) {
    return showToast('请勾选协议')
  }
  // 判断是短信还是密码登录
  if (isPassword.value) {
    const res = await loginByPasswordAPI(mobile.value, password.value)
    userStore.setUser(res.data) // 登录成功，保存用户信息
  } else {
    const res = await loginByMobileAPI(mobile.value, code.value)
    userStore.setUser(res.data)
  }
  // console.log(res)
  showSuccessToast('登录成功')
  router.replace((route.query.returnUrl as string) || '/user')
}

// 短信登录界面切换
const isPassword = ref(true) // 默认密码登录模式，如果为false则切换为短信登录模式，如果为true则切换为密码登录模式
const code = ref('')
// 发送验证码
const { time, onSendCode, form } = useMobileCode(mobile, 'login')

// 控制密码可见与不可见
const isShow = ref(false)

const url =
  'https://graph.qq.com/oauth2.0/authorize?client_id=102015968&amp;response_type=token&amp;scope=all&amp;redirect_uri=' +
  encodeURIComponent(import.meta.env.VITE_APP_CALLBACK + '/login/callback')
</script>

<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" @click-right="onClickRight"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPassword ? '密码登录' : '短信登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPassword = !isPassword">{{
          isPassword ? '短信验证码登录' : '密码登录'
        }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPassword"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="isShow ? 'text' : 'password'"
      >
        <template #button>
          <cp-icon
            :name="`login-eye-${isShow ? 'on' : 'off'}`"
            @click="isShow = !isShow"
            style="margin-right: 10px"
          ></cp-icon>
        </template>
      </van-field>
      <van-field
        v-else
        placeholder="短信验证码"
        :rules="codeRules"
        v-model="code"
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
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button native-type="submit" block round type="primary"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <cp-icon name="consul t-wechat"></cp-icon>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <a
        @click="userStore.setReturnUrl(route.query.returnUrl as string)"
        class="icon"
        :href="url"
      >
        <img src="@/assets/qq.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
