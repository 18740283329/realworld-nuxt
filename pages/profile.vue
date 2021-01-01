<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>
            <nuxt-link
              to="/setting"
              v-if="user.username === profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-else @click="follow">
              <i class="ion-plus-round"></i>
              &nbsp;
              <template v-if="profile.following">Unfollow</template>
              <template v-else>Follow</template>
              {{profile.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <span
                  class="nav-link"
                  :class="{active: tab !== 'favorited'}"
                  @click="changeTab()"
                >My Articles</span>
              </li>
              <li class="nav-item">
                <span
                  class="nav-link"
                  :class="{active: tab === 'favorited'}"
                  @click="changeTab('favorited')"
                >Favorited Articles</span>
              </li>
            </ul>
          </div>

          <template v-for="(article, index) in articles">
            <article-item :data="article" :index="index" :key="index"></article-item>
          </template>
          <div class="article-preview" v-if="!articles.length">No articles are here... yet.</div>
          <div class="ng-isolate-scope" v-if="totalPageCount > 1">
            <div>
              <ul class="pagination">
                <li
                  class="page-item ng-scope"
                  v-for="count in totalPageCount"
                  :key="count"
                  :class="{active: page === count}"
                >
                  <span class="page-link ng-binding" @click="changePage(count)">{{count}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, unFollowUser, followUser, getArticles } from "../api";
import { mapState } from "vuex";
import ArticleItem from "../components/article";

export default {
  components: {
    ArticleItem
  },
  middleware: "authenticated",
  data() {
    return {
      profile: {},
      articles: [],
      tab: "",
      totalPageCount: 0,
      page: 1
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async getUserInfo() {
      const { username } = this.$route.params;
      if (!username) return;
      const { data } = await getUserInfo(username);
      this.profile = data.profile || {};
    },
    async follow() {
      const { following, username } = this.profile;
      const fn = following ? unFollowUser : followUser;
      const { data } = await fn(username);
      this.profile = data.profile || {};
    },
    async getArticles() {
      const { username } = this.$route.params;
      const params = { limit: 20 };
      params.offset = params.limit * (this.page - 1);
      if (this.tab === "favorited") {
        params.favorited = username;
      } else {
        params.author = username;
      }
      const { data = {} } = await getArticles(params);
      this.articles = data.articles || [];
      this.totalPageCount = Math.ceil(data.articlesCount / params.limit);
    },
    changeTab(tab) {
      this.tab = tab;
      this.getArticles();
    },
    changePage(page) {
      this.page = page;
      this.getArticles();
    }
  },
  mounted() {
    this.getUserInfo();
    this.getArticles();
  }
};
</script>
<style scoped>
.nav-link,
.page-link {
  cursor: pointer;
}
</style>