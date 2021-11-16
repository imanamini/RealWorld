<template>
  <div class="row">
    <form class="col-xl-9 col-lg-8 col-md-7 col-6" @submit.prevent="save()">
      <label :class="titleError ? 'text-danger' : ''" class="line-height-18"
        >Title</label
      >
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
      <label
        :class="descriptionError ? 'text-danger' : ''"
        class="mt-5 line-height-18"
        >Description</label
      >
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
      <label :class="bodyError ? 'text-danger' : ''" class="mt-4 line-height-18"
        >Body</label
      >
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
    <div class="col-xl-3 col-lg-4 col-md-5 col-6">
      <label class="line-height-18">Tags</label>
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
          <label class="form-check-label" :for="'check' + tag">{{ tag }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormPost',
  props:{
    tempPost:{
      type: Array,
      default: (()=>{
        return null
      })
    }
  },
  data() {
    return {
      post: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      titleError: false,
      descriptionError: false,
      bodyError: false,
      newTag: '',
      tags: [],
    }
  },
  watch:{
    tempPost(neww){
      if (this.tempPost){
        this.post = { ...neww }
      }
    }
  },
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      this.$axios
        .get('tags')
        .then((response) => {
          if (response) {
            this.tags = response.data.tags
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addTag() {
      this.tags.push(this.newTag)
      this.post.tagList.push(this.newTag)
      this.tags.sort((a, b) => a.localeCompare(b))
      this.newTag = ''
    },
    save() {
      if (!this.post.description || !this.post.body || !this.post.title) {
        if (!this.post.description) this.descriptionError = true
        if (!this.post.title) this.titleError = true
        if (!this.post.body) this.bodyError = true
        return
      }
      this.$emit('save', this.post)
    },
    cleanErrors(error) {
      switch (error) {
        case 'titleError':
          this.titleError = false
          break
        case 'descriptionError':
          this.descriptionError = false
          break
        case 'bodyError':
          this.bodyError = false
          break
      }
      this.$('input[type=submit]').prop('disabled', false)
    },
  },
}
</script>

<style scoped>
textarea {
  height: 207px;
  resize: none;
}
input.form-control {
  height: 40px;
}
.card {
  height: 355px;
  overflow: auto;
}
.form-group {
  margin-bottom: 12px;
}
</style>
