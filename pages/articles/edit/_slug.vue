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
      .catch(() => {})
  },
  methods: {
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
        .catch(() => {})
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
.card {
  height: 355px;
  overflow: auto;
}
textarea {
  height: 207px;
  resize: none;
}
.form-group {
  margin-bottom: 12px;
}
input.form-control {
  height: 40px;
}
</style>
