<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center" v-if="isLogin">Sign in</h1>
          <h1 class="text-xs-center" v-else>Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link to="register" v-if="isLogin">Need an account?</nuxt-link>
            <nuxt-link to="login" v-else>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(fields, error) in errors">
              <li v-for="field in fields" :key="field">{{error}} {{field}}</li>
            </template>
          </ul>

          <form @submit.prevent="login">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button v-if="isLogin" class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
            <button v-else class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../api";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "notAuthenticated",
  asyncData(context) {
    const { user } = context.store.state;
    const url = process.server ? context.req.url : context.route.path;
    const isLogin = url.indexOf("/login") > -1;
    return {
      isLogin
    };
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: ""
      },
      errors: {}
    };
  },
  methods: {
    async login() {
      try {
        const fn = this.isLogin ? login : register;
        const { data } = await fn({ user: this.user });
        const { user } = data;
        this.errors = {};
        this.$store.commit("setUser", user);
        Cookie.set("user", user);
        this.$router.push("/");
      } catch (error) {
        console.dir(error);
        if (error.response) {
          this.errors = error.response.data.errors;
        }
      }
    }
  }
};
</script>