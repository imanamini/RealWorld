<template>
  <main class="pt-4">
    <div class="fs-40 line-height-48 mb-4 pb-1">New Article</div>
    <div class="row">
      <form class="col-9" @submit.prevent="save()">
        <label class='line-height-18'>Title</label>
        <input
          v-model="post.title"
          :class="titleError ? 'border-danger' : ''"
          type="text"
          class="form-control"
          @keyup="cleanErrors('titleError')"
        />
        <span v-show="titleError" class="position-absolute text-danger">
          Required field
        </span>
        <label  class="mt-5 line-height-18">Description</label>
        <input
          v-model="post.description"
          :class="descriptionError ? 'border-danger' : ''"
          type="text"
          class="form-control"
          @keyup="cleanErrors('descriptionError')"
        />
        <span v-show="descriptionError" class="position-absolute text-danger"
          >Required field</span
        >
        <label class="mt-4 line-height-18">Body</label>
        <textarea
          v-model="post.body"
          :class="bodyError ? 'border-danger' : ''"
          type="text"
          class="form-control"
          @keyup="cleanErrors('bodyError')"
        />
        <span v-show="bodyError" class="position-absolute text-danger"
          >Required field</span
        >
        <input class="btn btn-primary mt-4 px-4" type="submit" value="Submit" />
      </form>
      <div class="col-3">
        <label class='line-height-18'>Tags</label>
        <input
          v-model="newTag"
          class="form-control"
          placeholder="New tag"
          @keyup.enter="addTag()"
        />
        <div class="card p-3 mt-3">
          <div
            v-for="tag in tags"
            :key="tag"
            class="form-group form-check d-flex align-items-center"
          >
            <input
              :id="'check' + tag"
              v-model="post.tagList"
              type="checkbox"
              :value="tag"
              class="form-check-input"
            />
            <label class="form-check-label" :for="'check' + tag">{{
              tag
            }}</label>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Index',
  layout: 'dashboard',
  data() {
    return {
      post: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      tags: [],
      newTag: '',
      descriptionError: false,
      bodyError: false,
      titleError: false,
    }
  },
  mounted() {
    this.$axios
      .get('tags')
      .then((response) => {
        if (response) {
          this.tags = response.data.tags
          // this.conventionToken(response.data.user.token)
          // this.$router.push('/dashboard')
        }
      })
      .catch(() => {})
  },
  methods: {
    cleanErrors(error) {
      switch (error) {
        case 'titleError':
          this.titleError = false;
          break;
        case 'descriptionError':
          this.descriptionError = false;
          break;
        case 'bodyError':
          this.bodyError = false;
          break;
      }
      this.$('input[type=submit]').prop('disabled', false)
    },
    addTag() {
      this.tags.push(this.newTag)
      this.post.tagList.push(this.newTag)
      this.tags.sort((a, b) => a.localeCompare(b))
      this.newTag = ''
    },
    save() {
      this.$('input[type=submit]').prop('disabled', true)
      this.$axios
        .post('articles', {
          article: this.post,
        })
        .then((response) => {
          if (response) {
            this.$('input[type=submit]').prop('disabled', false)
            // this.conventionToken(response.data.user.token)
            this.$router.push('/dashboard/articles')
          }
        })
        .catch((error) => {
          if (error.response.data.errors.description) {
            this.descriptionError = true
          }
          if (error.response.data.errors.title) {
            this.titleError = true
          }
          if (error.response.data.errors.body) {
            this.bodyError = true
          }
        })
    },
  },
}
</script>

<style scoped>
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
.form-group{
  margin-bottom: 12px;
}
input.form-control{
  height: 40px;
}
</style>
