<template>
  <!-- 注册表单 -->
  <form
    v-if="is_register"
    class="form form-register hidden"
    id="register-form"
    v-on:submit.prevent="onSubmit"
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
          v-model="nickname"
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
          v-model="password"
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
</template>

<script>
export default {
  name: "registerForm",
  data() {
    return {
      nickname: "",
      password: "",
      is_law_accepted: ""
    };
  },
  computed: {
    is_register: function() {
      return this.$route.query.action == "register";
    },
    nickname_zhanyong() {
      return this.nickname == "aaa";
    }
  },
  watch: {
    register_nickname(newval, oldval) {
      // console.log(newval,oldval)
      return (this.nickname_zhanyong == newval) == "aaa";
    }
  },
  methods: {
    toggle_accepted() {
      this.is_law_accepted = !this.is_law_accepted;
    },

    onSubmit() {
      if (!this.nickname) {
        alert("请输入您的昵称");
      }
      // else if (this.sign_in_nickname != "aaa") {
      //   this.nickname_zhanyong = true;
      // }
      else if (!this.password) {
        alert("请输入你的密码");
      } else if (!this.is_law_accepted) {
        alert("请阅读接受协议");
      } else {
        //this.$router.push({path: '/passport/sign_in'});
        this.$router.push({ name: "sign_in" });
      }
    }
  }
};
</script>

<style>
@import "~@/assets/scss/passport.css";
</style>