<script setup lang="ts">
import { loginByQQAPI } from '@/services/user.js'
import { onMounted, ref } from 'vue'

const id = ref('')
const isNeedBind = ref(false)
onMounted(() => {
  if (QC.Login.check()) {
    QC.Login.getMe((openId: string) => {
      id.value = openId
      console.log(openId)
      loginByQQAPI(openId)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
          isNeedBind.value = true
        })
    })
  }
})
</script>

<template>
  <template>
    <div class="login-page" v-if="isNeedBind">
      <cp-nav-bar></cp-nav-bar>
      <div class="login-head">
        <h3>手机绑定</h3>
      </div>
      <van-form autocomplete="off" ref="form">
        <van-field name="mobile" placeholder="请输入手机号"></van-field>
        <van-field name="code" placeholder="请输入验证码">
          <template #button>
            <span class="btn-send">发送验证码</span>
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
</template>

<style scoped>
@import '@/styles/login.scss';
</style>
