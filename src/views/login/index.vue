<template>
    <div class="login_container">
      <el-row>
        <el-col :span="10" :xs="0"></el-col>
        <el-col :span="14" :xs="24">
          <div class="login_box">
            <el-form
              class="login_form"
              :model="loginForm"
              :rules="rules"
              ref="loginValidate"
            >
              <el-form-item>
                <h2 style="margin: 0 0 .2rem;">用户登录</h2>
              </el-form-item>
              <el-form-item prop="user_name">
                <el-input
                  :prefix-icon="User"
                  v-model="loginForm.user_name"
                  placeholder="请输入工号"
                />
              </el-form-item>
              <el-form-item
                prop="password"
              >
                <el-input
                  type="password"
                  :prefix-icon="Lock"
                  v-model="loginForm.password"
                  show-password
                  placeholder="请输入密码"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login_btn"
                  type="primary"
                  size="default"
                  @click="login"
                  :loading="loading"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script setup lang="ts">
  import useAdminStore from '@/store/modules/admin'
  import { User, Lock } from '@element-plus/icons-vue'
  import { reactive, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { ElNotification } from 'element-plus'
  import { getTime } from '@/utils/time'
  
  const loading = ref(false)
  
  let adminStore = useAdminStore()
  let $router = useRouter()
  let $route = useRoute()
  
  const loginForm = reactive({ user_name: '', password: '' })
  let loginValidate = ref()
  
  const login = async () => {
    // 表单校验
    await loginValidate.value.validate()
  
    loading.value = true
  
    try {
      await adminStore.adminLogin(loginForm)
  
      let redirect: any = $route.query.redirect
      $router.push({ path: redirect || '/' })
  
      ElNotification({
        type: 'success',
        message: '欢迎回来!',
        title: `Hi, ${getTime()}好!`,
      })
      loading.value = false
    } catch (error) {
      loading.value = false
      ElNotification({
        type: 'error',
        message: (error as Error).message,
      })
    }
  }
  
  // 表单校验规则
  const rules = {
    user_name: [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      {
        type: 'email',
        message: '请输入正确的邮箱地址',
        trigger: ['blur', 'change'],
      },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  }
  </script>
  
  <style scoped lang="scss">
  .login_container {
    position: relative;
    width: 100%;
    height: 100vh;
    padding: 40px;
  
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('@/assets/images/background.jpg') no-repeat;
      background-size: cover;
      opacity: 0.7;
      z-index: -1;
    }
  }
  
  .login_box {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  
    position: relative;
    width: 40%;
    top: 20vh;
    margin-left: 20%;
  }
  
  .login_form {
    color: rgba(0, 0, 0, 0.75);
  
    .login_tabs {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .verify_code {
      width: 100%;
      display: flex;
      align-items: center;
    }
  
    .verify_code_input {
      flex: 1;
      margin-right: 10px;
    }
  
    .login_btn {
      width: 100%;
      margin-top: 20px;
    }
  }
  </style>
  