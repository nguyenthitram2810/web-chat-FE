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
              <h3>Đăng ký với Web Chat</h3>
              <p>Kết bạn - Trò chuyện</p>

              <div class="page-links">
                  <nuxt-link to="/login">Đăng nhập</nuxt-link>
                  <nuxt-link to="/register" class="active">Đăng ký</nuxt-link>
              </div>

              <a-form-model ref="registerForm" :model="registerForm" :rules="rules">
                <a-form-model-item  has-feedback prop="username" class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.username" autocomplete="off" placeholder="Tên người dùng"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="email"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.email" autocomplete="off" placeholder="Địa chỉ Email"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="password" class="m-0 form-validate" >
                  <a-input :disabled="isDisabled" type="password" v-model="registerForm.password" autocomplete="off" placeholder="Mật khẩu"/>
                </a-form-model-item>
                <a-form-model-item has-feedback prop="confirmPass" class="m-0 form-validate" >
                  <a-input :disabled="isDisabled" type="password" v-model="registerForm.confirmPass" autocomplete="off" placeholder="Xác nhận mật khẩu"/>
                </a-form-model-item>

                <a-form-model-item  class="form-button mb-0 mt-2">
                  <a-button  :loading="isDisabled" class="ibtn" @click="registerSubmit">
                   Đăng ký
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

    let validateName = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập tên người dùng'));
      } else {
        callback();
      }
    };

    let validatePassConfirm = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập xác nhận mật khẩu'));
      } else if (value !== (this.registerForm.password)) {
        callback(new Error("Mật khẩu xác nhận sai"));
      } else {
        callback();
      }
    };

    return {
      isDisabled: false,
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPass: '',
      },
      rules: {
        username:  [{ required: true, validator: validateName }],
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

        confirmPass: [
          {
            required: true,
            validator: validatePassConfirm
          }
        ], 
      }
    }
  },
  methods: {
    registerSubmit(event) {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.isDisabled = true;
          delete this.registerForm.confirmPass;
          try {
            const response = await axios.post(`http://78f90e8249d4.ngrok.io/api/v1/signup`, {
              username: this.registerForm.username.trim(),
              email: this.registerForm.email.trim(), 
              password: this.registerForm.password.trim(),
            });
            if(response.data.status == "200") {
              localStorage.setItem("currentUser", JSON.stringify(response.data.data.userInfo)); 
              localStorage.setItem("token", response.data.data.token); 
              this.$store.commit("auth/SET_CURRENT_USER", JSON.parse(localStorage.getItem("currentUser")));
              this.$store.commit("auth/SET_TOKEN", localStorage.getItem("token"));
              this.$router.push("/");
            }
            else {
              this.isDisabled = false
              this.$notification["error"]({
                message: 'REGISTER ERROR',
                description:
                  response.data.message
              });
            }
          }
          catch(e) {
            this.isDisabled = false
            this.$notification["error"]({
              message: 'REGISTER ERROR',
              description:
                e.message
            });
          }
        } else {
          return false;
        }
      });
    },
  },
}
</script>

<style lang='scss' scoped>
@import url("./style.scss");
.ant-radio-wrapper {
  color: white;
  font-size: 15px;
}
</style>
