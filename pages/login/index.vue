<template>
  <div class="form-body">
      <div class="website-logo">
        <nuxt-link to="/">
          <div class="logo">
            <img class="logo-size" src="/images/logo_web_chat.png" alt="">
          </div>
        </nuxt-link>
      </div>

      <div class="row">
        <div class="img-holder">
            <div class="bg"></div>
        </div>

        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
              <h3>Đăng nhập với Web Chat</h3>
              <p>Kết bạn - Trò chuyện</p>

              <div class="page-links">
                  <nuxt-link to="/login" class="active">Đăng nhập</nuxt-link>
                  <nuxt-link to="/register">Đăng ký</nuxt-link>
              </div>

              <a-form-model ref="loginForm" :model="loginForm" :rules="rules">
                <a-form-model-item has-feedback prop="email"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="loginForm.email" autocomplete="off" placeholder="Địa chỉ Email"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="password" class="m-0 form-validate" >
                  <a-input :disabled="isDisabled" type="password" v-model="loginForm.password" autocomplete="off" placeholder="Mật khẩu"/>
                </a-form-model-item>

                <a-form-model-item  class="form-button mb-0 mt-2">
                  <a-button  :loading="isDisabled" class="ibtn" @click="loginSubmit">
                   Đăng nhập
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: 'fullpage',
  middleware: 'notAuthentication',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập mật khẩu'));
      } else {
        callback();
      }
    };
    return {
      isDisabled: false,
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email:  [
          {
            type: 'email',
            message: 'Email không hợp lệ',
          },
          {
            required: true,
            message: 'Nhập địa chỉ email',
          },
        ],
        password: [
          { 
            required: true,
            validator: validatePass, 
          },
          {
            min: 6,
            message: 'Độ dài mật khẩu > 6 ký tự(không kể ký tự trắng)'
          }
        ],
      }
    }
  },
  methods: {
    async loginSubmit(event) {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.isDisabled = true
          try {
            const response = await axios.post(`http://localhost:5000/api/v1/signin`, {
              email: this.loginForm.email.trim(), 
              password: this.loginForm.password.trim(),
            });
            console.log(response)
            if(response.data.status == "200") {
              localStorage.setItem("currentUser", JSON.stringify(response.data.data.userInfo)); 
              localStorage.setItem("token", response.data.data.token); 
              this.$store.dispatch("auth/setCurrent", { currentUser: JSON.parse(localStorage.getItem("currentUser")) });
              this.$router.push("/");
            }
            else {
              this.isDisabled = false
              this.$notification["error"]({
                message: 'LOGIN ERROR',
                description:
                  response.data.message
              });
            }
          }
          catch(e) {
            this.isDisabled = false
            this.$notification["error"]({
              message: 'LOGIN ERROR',
              description:
                e.message
            });
          }
        } else {
          return false;
        }
      });
    }
  },
}
</script>

<style lang='scss' scoped>
@import url("./style.scss");

</style>
