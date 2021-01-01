<template>
  <div class="article-preview" :key="article.slug">
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
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{active: article.favorited}"
        @click="favoriteArticle"
        :disabled="article.favoritedDisabled"
      >
        <i class="ion-heart"></i>
        {{article.favoritesCount}}
      </button>
    </div>
    <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>
</template>
<script>
import { favoriteArticle, unFavoriteArticle } from "../api";
export default {
  name: "ArticleItem",
  props: {
    data: {
      type: Object,
      default: {}
    },
    index: {
      type: Number
    }
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
    async favoriteArticle() {
      const index = this.index;
      const art = this.article;
      art.favoritedDisabled = true;
      const { slug, favorited } = art;
      const fn = favorited ? unFavoriteArticle : favoriteArticle;
      const { data: { article = {} } = {} } = await fn(slug);
      article.favoritedDisabled = false;
      this.article = Object.assign({}, art, article);
    }
  }
};
</script>