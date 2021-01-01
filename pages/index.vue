<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :to="{name: 'home', query:{tab: 'your_feed'}}"
                  exact
                  :class="{active: tab === 'your_feed'}"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{active: tab === 'global_feed'}"
                  exact
                  :to="{name: 'home', query:{tab: 'global_feed'}}"
                >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" to :class="{active: tab === 'tag_feed'}">{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <template v-for="(article, index) in articles">
            <article-item :data="article" :index="index" :key="index"></article-item>
          </template>
          <div class="article-preview" v-if="!articles.length">No articles are here... yet.</div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{name: 'home', query: {tag: item}}"
                :key="item"
                class="tag-pill tag-default"
                exact
                v-for="item in tags"
              >{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ng-isolate-scope">
      <div>
        <ul class="pagination">
          <li
            class="page-item ng-scope"
            v-for="count in totalPageCount"
            :key="count"
            :class="{active: page === count}"
          >
            <nuxt-link
              class="page-link ng-binding"
              exact
              :to="{ name: 'home', query: {page: count, tag, tab} }"
            >{{count}}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "../components/article";

import { getArticles, getTags, getFeedArticles } from "../api";
export default {
  components: {
    ArticleItem
  },
  async asyncData({ query, store }) {
    const { page = 1, tag, author, tab = "global_feed" } = query;
    const limit = 20;
    const offset = limit * (page - 1);
    const fn = tab === "your_feed" ? getFeedArticles : getArticles;
    const [{ data: tagData }, { data }] = await Promise.all([
      getTags(),
      fn({ limit, offset, tag, author })
    ]);
    const { articlesCount, articles } = data || {};
    return {
      totalPageCount: Math.ceil(articlesCount / limit),
      articles,
      limit,
      page: +page,
      tags: tagData.tags,
      tag,
      user: store.state.user,
      tab: tag ? "tag_feed" : tab
    };
  },
  methods: {},
  watchQuery: ["page", "tag", "tab"]
};
</script>