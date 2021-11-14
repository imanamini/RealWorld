<template>
  <main class="pt-4">
    <div class="fs-40 line-height-48 mb-4 pb-1">All Posts</div>
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
          <td>{{ article.body.substring(0, 19) }}...</td>
          <td>{{ convertDate(article.createdAt) }}</td>
          <td>
            <div class="btn-group">
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
                <button class="dropdown-item">Edit</button>
                <div class="dropdown-divider my-0"></div>
                <button class="dropdown-item">Delete</button>
              </div>
            </div>
          </td>
        </tr>
        <!--    <tr>-->
        <!--      <th scope="row">2</th>-->
        <!--      <td>Jacob</td>-->
        <!--      <td>Thornton</td>-->
        <!--      <td>@fat</td>-->
        <!--    </tr>-->
        <!--    <tr>-->
        <!--      <th scope="row">3</th>-->
        <!--      <td>Larry</td>-->
        <!--      <td>the Bird</td>-->
        <!--      <td>@twitter</td>-->
        <!--    </tr>-->
      </tbody>
    </table>
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
    }
  },
  mounted() {
    this.$axios
      .get('articles')
      .then((response) => {
        if (response) {
          this.articles = response.data.articles
          // this.conventionToken(response.data.user.token)
          // this.$router.push('/dashboard')
        }
      })
      .catch(() => {
        this.registerError = true
      })
  },
}
</script>

<style scoped>
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
</style>
