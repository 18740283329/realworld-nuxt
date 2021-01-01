<template>
  <div class="article-meta">
    <nuxt-link :to="`/profile/${article.author.username}`">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="`/profile/${article.author.username}`"
        class="author"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createdAt | date('MMM D,YYYY')}}</span>
    </div>
    <template v-if="isOther">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="follow"
        :class="{'btn-secondary': article.author.following}"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        <template v-if="article.author.following">Unfollow</template>
        <template v-else>Follow</template>
        {{article.author.username}}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        @click="favoriteArticle"
        :class="{'btn-primary': article.favorited}"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post
        <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </template>
    <template v-else>
      <nuxt-link class="btn btn-outline-secondary btn-sm" :to="`/editor/${article.slug}`">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
  </div>
</template>
<script>
import {
  unFollowUser,
  followUser,
  unFavoriteArticle,
  favoriteArticle,
  deleteArticle
} from "../api";
export default {
  name: "articleAuthor",
  props: {
    data: Object,
    isOther: Boolean
  },
  data() {
    return {
      article: this.data
    };
  },
  watch: {
    data: function() {
      this.article = this.data;
    }
  },
  methods: {
    async follow() {
      const { following, username } = this.article.author;
      const fn = following ? unFollowUser : followUser;
      const { data } = await fn(username);
      this.article.author = data.profile;
    },
    async favoriteArticle() {
      const index = this.index;
      const art = this.article;
      art.favoritedDisabled = true;
      const { slug, favorited } = art;
      const fn = favorited ? unFavoriteArticle : favoriteArticle;
      const { data: { article = {} } = {} } = await fn(slug);
      article.favoritedDisabled = false;
      this.article = Object.assign({}, art, article);
    },
    async deleteArticle() {
      await deleteArticle(this.article.slug);
      this.$router.push("/");
    }
  }
};
</script>