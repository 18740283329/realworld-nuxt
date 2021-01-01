<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="info.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="info.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="info.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="info.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="info.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
            <hr />
            <button class="btn btn-outline-danger" @click="logout">Or click here to logout.</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { updateUserInfo } from "../api";

export default {
  middleware: "authenticated",

  async asyncData({ store }) {
    return {
      info: { ...store.state.user }
    };
  },

  methods: {
    async submit() {
      const { data } = await updateUserInfo(this.info);
      this.$store.commit("setUser", this.info);
      Cookie.set("user", this.info);
      this.$router.push(`/profile/${this.info.username}`);
    },
    logout() {
      this.$store.commit("setUser", null);
      Cookie.remove("user");
      this.$router.push("/");
    }
  }
};
</script>