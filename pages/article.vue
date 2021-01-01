<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <article-author :isOther="isOther" :data="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-author :isOther="isOther" :data="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form" @submit.prevent="addComment">
            <div class="card-block">
              <textarea
                v-model="comment"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary" type="submit">Post Comment</button>
            </div>
          </form>

          <div class="card" v-for="(item, index) in comments" :key="index">
            <div class="card-block">
              <p class="card-text">{{item.body}}</p>
            </div>
            <div class="card-footer">
              <nuxt-link :to="`/profile/${item.author.username}`" class="comment-author">
                <img :src="item.author.image" class="comment-author-img" />
              </nuxt-link>&nbsp;
              <nuxt-link
                :to="`/profile/${item.author.username}`"
                class="comment-author"
              >{{item.author.username}}</nuxt-link>
              <span class="date-posted">{{item.createdAt | date('MMM D,YYYY')}}</span>
              <span class="mod-options" v-if="item.author.username === username">
                <i class="ion-trash-a" @click="deleteCommen(index)"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ArticleAuthor from "../components/articleAuthor";
import {
  getArticleDetails,
  addComment,
  getComments,
  deleteCommen
} from "../api";

const md = require("markdown-it")();

export default {
  components: {
    ArticleAuthor
  },
  async asyncData({ route, store }) {
    const { slug } = route.params;
    const { data } = await getArticleDetails(slug);
    const body = md.render(data.article.body);
    const { username } = store.state.user || {};
    return {
      article: { ...data.article, body },
      isOther: username !== data.article.author.username,
      slug,
      username
    };
  },
  data() {
    return {
      comment: "",
      comments: []
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    async addComment() {
      const { data } = await addComment(this.slug, { body: this.comment });
      this.comments.unshift(data.comment);
    },
    async getComments() {
      const { data } = await getComments(this.slug);
      this.comments = data.comments;
    },
    async deleteCommen(index) {
      const { id } = this.comments[index];
      const { data } = await deleteCommen(this.slug, id);
      this.comments.splice(index, 1);
    }
  }
};
</script>