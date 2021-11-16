<template>
  <main class="pt-4">
    <div class="fs-40 line-height-48 mb-4 pb-1">Edit Article</div>
    <FormPost :temp-post='post' @save='updatePost'/>
  </main>
</template>

<script>
export default {
  name: 'Slug',
  layout: 'dashboard',
  data() {
    return {
      post: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    }
  },
  created() {
    this.$axios
      .get('articles/' + this.$route.params.slug)
      .then((response) => {
        if (response) {
          this.post = response.data.article
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    /**
     * Update post
     *
     * Author: Iman Amini
     * last edit: 1400/08/26 by Iman Amini
     * inspector:
     *
     * @param post {Object} is post data
     */
    updatePost(post) {
      this.$('input[type=submit]').prop('disabled', true)
      this.$axios
        .put('articles/' + this.$route.params.slug, {
          article: post,
        })
        .then((response) => {
          if (response) {
            this.$('input[type=submit]').prop('disabled', false)
            this.$router.push('/articles')
            setTimeout(() => {
              this.showToastMessage(
                '<b>Well done!</b> Article updated successfully'
              )
            }, 2000)
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
</style>
