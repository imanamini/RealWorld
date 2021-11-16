<template>
  <main class="pt-4">
    <div class="fs-40 line-height-48 mb-4 pb-1">All Posts</div>
    <div class="table-responsive">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th
              v-for="head in heads"
              :key="head"
              style="text-transform: capitalize"
              scope="col"
            >
              {{ head }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" :key="article.title">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ article.title }}</td>
            <td>@{{ article.author.username }}</td>
            <td>{{ article.tagList.toString() }}</td>
            <td>{{ article.body.substring(0, 19) }}{{article.body.length > 20 ? '...' : ''}}</td>
            <td>{{ convertDate(article.createdAt) }}</td>
            <td>
              <div class="btn-group float-right">
                <button type="button" class="btn btn-info">...</button>
                <button
                  type="button"
                  class="btn btn-info dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu dropdown-menu-right py-0">
                  <nuxt-link :to="'articles/edit/' + article.slug">
                    <button class="dropdown-item">Edit</button>
                  </nuxt-link>
                  <div class="dropdown-divider my-0"></div>
                  <button
                    type="button"
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#DeleteModal"
                    @click="deleteSlug = article.slug"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <delete-modal @delete="deleteArticle" />
    <div
      id="toast"
      class="toast position-fixed align-items-center d-flex"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    ></div>
  </main>
</template>

<script>
export default {
  name: 'Index',
  layout: 'dashboard',
  data() {
    return {
      heads: ['#', 'title', 'author', 'tags', 'excerpt', 'created', ''],
      articles: [],
      deleteSlug: '',
      toastText: '',
    }
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    /**
     * Delete articles
     *
     * After click "Yes" in <DeleteModal> this function call.
     *
     * Author: Iman Amini
     * last edit: 1400/08/24 by Iman Amini
     * inspector:
     *
     */
    deleteArticle() {
      this.$axios.delete('articles/' + this.deleteSlug).then(() => {
        this.getArticles()
        this.showToastMessage('Article deleted successfully')
      })
    },
    /**
     * Get articles
     *
     * Author: Iman Amini
     * last edit: 1400/08/22 by Iman Amini
     * inspector:
     *
     */
    getArticles() {
      this.$axios
        .get('articles')
        .then((response) => {
          if (response) {
            this.articles = response.data.articles
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  main {
    margin-left: 181px !important;
  }
}
main {
  margin-left: 281px;
  padding-right: 30px;
}
.dropdown-item {
  color: #373a3c;
  font-size: 16px;
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 15px;
  line-height: 1;
}
.toast {
  top: 80px;
  right: 30px;
  background-color: #d5e6c7;
  color: #4b713d;
  padding: 16px 20px;
  height: 49px;
  max-width: unset;
}
a {
  color: unset;
}
a:hover {
  text-decoration: none;
}
</style>
