<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="createArticle">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="article.body"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="article.tagList"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticleDetails, updateArticle } from "../api";
export default {
  middleware: "authenticated",
  data() {
    const { slug } = this.$route.params;
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: ""
      },
      slug
    };
  },
  mounted() {
    this.getArticleDetails();
  },
  methods: {
    async createArticle() {
      const { article } = this;
      const fn = this.slug ? updateArticle : createArticle;
      const { data } = await fn({
        ...article,
        tagList: JSON.stringify(article.tagList.split(","))
      });
      this.$router.push(`/article/${data.article.slug}`);
    },
    async getArticleDetails() {
      if (!this.slug) return;
      const { data } = await getArticleDetails(this.slug);
      this.article = {
        ...data.article,
        tagList: data.article.tagList.join(",")
      };
    }
  }
};
</script>