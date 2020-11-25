<template>
  <a-layout-header>
    <a-row type="flex" class="justify-content-between">
      <a-col>  
        <img src="/images/logo_web_chat.png" alt="" width="90px" height="auto">
      </a-col>

      <a-col>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1"> <a-icon type="user" />{{ user.username}}</a-menu-item>
            <a-menu-item key="3" @click="loggOut"> <a-icon type="logout" />Đăng xuất </a-menu-item>
          </a-menu>
          <div>
            <a-avatar style="border: 1.5px solid white;" size="large" :src="user.avatar" />
          </div>
        </a-dropdown>
      </a-col>
    </a-row>
	</a-layout-header>
</template>

<style scoped>
@import url("./style.scss");
.logo {
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  float: left;
}
</style>

<script>
export default {
  name: 'BaseHeader',
  data() {
    return {
      user: JSON.parse(localStorage.getItem("currentUser"))
    }
  },
  methods: {
    loggOut () {
      localStorage.removeItem("currentUser"); 
      localStorage.removeItem("token");
      this.$store.commit("auth/SET_CURRENT_USER", null);
      this.$store.commit("auth/SET_TOKEN", null);
      this.$router.push("/login");
    }
  }
}
</script>
