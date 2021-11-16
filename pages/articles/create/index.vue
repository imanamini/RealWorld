<template>
  <main class="pt-4">
    <div class="fs-40 line-height-48 mb-4 pb-1">New Article</div>
    <FormPost @save="createPost" />
  </main>
</template>

<script>
export default {
  name: 'Index',
  layout: 'dashboard',
  methods: {
    createPost(post) {
      this.$('input[type=submit]').prop('disabled', true)
      this.$axios
        .post('articles', {
          article: post,
        })
        .then((response) => {
          if (response) {
            this.$('input[type=submit]').prop('disabled', false)
            this.$router.push('/articles')
            setTimeout(() => {
              this.showToastMessage(
                '<b>Well done!</b> Article created successfully'
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
.form-group {
  margin-bottom: 12px;
}
</style>
