<template>
  <!-- 主页面 -->
  <div class="page-passport page" id="passportIndex">
    <img src="../assets/logo.png" class="image-logo">
    <div class="panel-main">
      <!-- 登录注册导航 -->
      <div class="nav-bar">
        <router-link
          class="nav-item"
          id="sign-in-tab"
          :to="{name: 'passport', query:{action: 'sign_in'}}"
        >
          <nav class="nav-login-form">登录</nav>
        </router-link>
        <router-link
          class="nav-item"
          id="register-tab"
          :to="{name: 'passport', query:{action: 'register'}}"
        >
          <nav class="nav-register-form">注册</nav>
        </router-link>
      </div>
      <signinForm></signinForm>
      <registerForm></registerForm>
    </div>
  </div>
</template>

<script>
import signinForm from "@/components/signinForm";
import registerForm from "@/components/registerForm";
export default {
  name: "passportIndex",
  data() {
    return {};
  },
  components: {
    signinForm,
    registerForm
  },
  computed: {
    is_sign_in() {
      return this.$route.query.action == "sign_in";
    },
    is_register: function() {
      return this.$route.query.action == "register";
    }
  },
  // 挂载成功函数
  mounted() {
    console.log("action result:", this.$route.query.action);
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/passport.css";
</style>
