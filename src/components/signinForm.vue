<template>
  <!-- 登录表单 -->
  <form
    v-if="is_sign_in"
    class="form form-sign-in hidden"
    id="sign-in-form"
    v-on:submit.prevent="onSubmit"
  >
    <div class="form-input-group">
      <div class="form-input-field">
        <input
          class="form-input"
          type="text"
          name="nickname"
          autocomplete="on"
          placeholder="请输入登录昵称"
          v-model="nickname"
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
          v-model="password"
        >
      </div>
    </div>
    <div class="form-input-group">
      <div class="form-input-field">
        <button class="btn-submit">登录</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "signinForm",
  data() {
    return {
      nickname: "",
      password: ""
    };
  },
  computed: {
    is_sign_in() {
      return this.$route.query.action == "sign_in";
    }
  },
  methods: {
    onSubmit() {
      if (!this.nickname) {
        alert("请输入您的昵称");
      } else if (!this.password) {
        alert("请输入你的密码");
      } else {
        this.$router.push({ name: "productList" });
        localStorage.setItem("token", "qqqqq");
      }
    }
  }
};
</script>

<style>
@import "~@/assets/scss/passport.css";
</style>

