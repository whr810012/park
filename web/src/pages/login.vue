<template>
  <div class="login-container">
    <el-row>
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-form ref="form" class="login-form" label-position="left" :model="form" :rules="rules">
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到{{ title }}！</div>
          <el-form-item prop="username" style="margin-top: 40px">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']" />
            </span>
            <el-input v-model.trim="form.username" v-focus placeholder="请输入用户名" tabindex="1" type="text" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']" />
            </span>
            <el-input :key="passwordType" ref="password" v-model.trim="form.password" placeholder="请输入密码" tabindex="2"
              :type="passwordType" />
            <span v-if="passwordType === 'password'" class="show-password">
              <vab-icon :icon="['fas', 'eye-slash']" />
            </span>
            <span v-else class="show-password">
              <vab-icon :icon="['fas', 'eye']" />
            </span>
          </el-form-item>
          <el-button class="login-btn" :loading="loading" type="primary" @click="onSubmit">登录</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Login } from '@/api/request.js'
export default {
  name: 'loginIndex',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    onSubmit() {
      if (!this.form.username) {
        this.$message.warning('请输入邮箱地址')
        return
      } else if (!this.form.password) {
        this.$message.warning('请输入密码')
        return
      }
      Login({ email: this.form.username, password: this.form.password }).then(res => {
        this.$message.success('登录成功')
        console.log('登录成功', res.data.data);
        const data = res.data.data
        if (data.img) {
          // 将json转换成对象
          data.img = JSON.parse(data.img)
        }
        this.$store.commit('setUserInfo', data)
        localStorage.setItem('userInfo', JSON.stringify(data))
        this.$router.push({ path: '/admin' })
      }).catch(() => {
        this.$message.error('邮箱/密码错误')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url('~@/assets/login_images/background.jpg') center center fixed no-repeat;
  background-size: cover;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: rgba(14, 18, 26, 1);
  }

  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: rgba(14, 18, 26, 1);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-btn {
    display: inherit;
    width: 220px;
    height: 60px;
    margin-top: 5px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .login-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 425px) / 2) 10% 10%;
    overflow: hidden;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      text-align: center;
    }
  }

  .svg-container {
    position: absolute;
    top: 14px;
    left: 15px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    top: 14px;
    right: 25px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {}

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        line-height: 18px;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 58px;
        padding-left: 45px;
        line-height: 58px;
        background: #f6f4fc;
        border: 0;
      }
    }
  }
}
</style>
