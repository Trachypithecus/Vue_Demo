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
          :to="{name: 'passport', params:{action: 'sign_in'}}"
        >
          <nav class="nav-login-form">登录</nav>
        </router-link>
        <router-link
          class="nav-item"
          id="register-tab"
          :to="{name: 'passport', params:{action: 'register'}}"
        >
          <nav class="nav-register-form">注册</nav>
        </router-link>
      </div>
      <!-- 登录表单 -->
      <form
        v-if="is_sign_in"
        class="form form-sign-in hidden"
        id="sign-in-form"
        v-on:submit.prevent="onSubmit_sign_in"
      >
        <div class="form-input-group">
          <div class="form-input-field">
            <input
              class="form-input"
              type="text"
              name="nickname"
              autocomplete="on"
              placeholder="请输入登录昵称"
              v-model="sign_in_nickname"
            >
          </div>
        </div>
        <div class="form-input-group">
          <div class="form-input-field">
            <input
              class="form-input"
              type="password"
              name="password"
              autocomplete="off"
              placeholder="请输入登录密码"
              v-model="sign_in_password"
            >
          </div>
        </div>
        <div class="form-input-group">
          <div class="form-input-field">
            <button class="btn-submit">登录</button>
          </div>
        </div>
      </form>
      <!-- 注册表单 -->
      <form
        v-if="is_register"
        class="form form-register hidden"
        id="register-form"
        v-on:submit.prevent="onSubmit_register"
      >
        <div class="form-input-group">
          <div class="form-label">
            <label>昵称</label>
            <span class="errmsg hidden" v-if="nickname_zhanyong">* 昵称已被占用</span>
          </div>
          <div class="form-input-field">
            <input
              class="form-input"
              type="text"
              name="nickname"
              placeholder="请输入昵称"
              v-model="register_nickname"
            >
          </div>
        </div>
        <div class="form-input-group">
          <div class="form-label">
            <label>密码</label>
          </div>
          <div class="form-input-field">
            <input
              class="form-input"
              type="password"
              name="password"
              autocomplete="off"
              placeholder="请输入密码"
              v-model="register_password"
            >
          </div>
        </div>
        <div class="form-input-group law-accepted">
          <i
            class="icon"
            id="is_law_accepted"
            :class="{active: is_law_accepted}"
            v-on:click="toggle_accepted"
          ></i>
          <span>
            阅读并接受
            <a class="law" href="javascript:void(0);">《会员协议》</a>
          </span>
        </div>
        <div class="form-input-group">
          <div class="form-input-field">
            <button class="btn-submit">注册</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "passportIndex",
  data() {
    return {
      sign_in_nickname: "",
      sign_in_password: "",
      register_password: "",
      register_nickname: "",
      is_law_accepted: "",
      //nickname_zhanyong: false
    };
  },
  // 挂载成功函数
  mounted() {
    console.log("action result:", this.$route.params.action);
  },
  computed: {
    is_sign_in() {
      return this.$route.params.action == "sign_in";
    },
    is_register: function() {
      return this.$route.params.action == "register";
    },
    nickname_zhanyong(){
      return this.register_nickname == 'aaa'
    }
  },
  watch: {
    register_nickname(newval,oldval){
      // console.log(newval,oldval)
      return this.nickname_zhanyong == newval =="aaa"
    }
  },
  //方法
  methods: {
    toggle_accepted() {
      this.is_law_accepted = !this.is_law_accepted;
    },
    onSubmit_sign_in() {
      if (!this.sign_in_nickname) {
        alert("请输入您的昵称");
      } else if (!this.sign_in_password) {
        alert("请输入你的密码");
      } else {
        alert("登录成功");
      }
    },
    onSubmit_register() {
      if (!this.register_nickname) {
        alert("请输入您的昵称");
      } 
      // else if (this.sign_in_nickname != "aaa") {
      //   this.nickname_zhanyong = true;
      // } 
      else if (!this.register_password) {
        alert("请输入你的密码");
      } else if (!this.is_law_accepted) {
        alert("请阅读接受协议");
      } else {
        alert("注册成功，请登录");
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/passport.css";
</style>
