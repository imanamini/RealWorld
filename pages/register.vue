<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="register mx-auto bg-silver">
      <div class="text-center color-warm-grey fs-47 line-height-56 mb-4">
        Register
      </div>
      <form @submit.prevent="register()">
        <label class="fs-16 color-charcoal-grey pl-2 mt-4">User</label>
        <input
          v-model="username"
          :class="registerError || requiredUsername ? 'border-danger' : ''"
          type="text"
          class="form-control"
          autocomplete="off"
          @keyup="requiredUsername = false"
        />
        <span
          v-show="registerError || requiredUsername"
          class="position-absolute text-danger"
          >{{
            requiredUsername ? 'Required Field' : 'Email or password incorrect!'
          }}</span
        >
        <label class="fs-16 color-charcoal-grey pl-2 mt-4">Email</label>
        <input
          v-model="email"
          :class="registerError || requiredEmail ? 'border-danger' : ''"
          type="email"
          class="form-control"
          autocomplete="off"
          @keyup="requiredEmail = false"
        />
        <span
          v-show="registerError || requiredEmail"
          class="position-absolute text-danger"
          >{{
            requiredEmail ? 'Required Field' : 'Email or password incorrect!'
          }}</span
        >
        <label class="fs-16 color-charcoal-grey pl-2 mt-4">Password</label>
        <input
          v-model="password"
          :class="registerError || requiredPassword ? 'border-danger' : ''"
          type="password"
          class="form-control"
          autocomplete="off"
          @keyup="requiredPassword = false"
        />
        <span
          v-show="registerError || requiredPassword"
          class="position-absolute text-danger"
          >{{
            requiredPassword ? 'Required Field' : 'Email or password incorrect!'
          }}</span
        >
        <input
          class="btn btn-primary w-100 mt-5"
          type="submit"
          value="Register"
        />
      </form>
      <div class="fs-16 color-charcoal-grey line-height-19 mt-2 pt-1">
        <span>Already Registered?</span>
        <nuxt-link to="/login"
          ><span class="font-weight-bold">Login</span></nuxt-link
        >
      </div>
    </div>
    <ToastMessage />
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      registerError: false,
      requiredEmail: false,
      requiredUsername: false,
      requiredPassword: false,
    }
  },
  methods: {
    /**
     * Register user
     *
     * Author: Iman Amini
     * last edit: 1400/08/21 by Iman Amini
     * inspector:
     *
     */
    register() {
      if (!this.email || !this.password || !this.username) {
        if (!this.email) this.requiredEmail = true
        if (!this.username) this.requiredUsername = true
        if (!this.password) this.requiredPassword = true
        this.$('.toast').toast('show')
        return
      }
      this.$axios
        .post('users', {
          user: {
            username: this.username,
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          if (response) {
            this.conventionToken(response.data.user.token)
            this.$router.push('/articles')
          }
        })
        .catch(() => {
          this.registerError = true
        })
    },
  },
}
</script>

<style scoped>
.register {
  width: 450px;
  padding: 35px 20px 20px 20px;
}
a {
  color: unset;
}
.toast {
  top: 30px;
  right: 30px;
  background-color: #efdfdf;
  color: #9f4f48;
  width: 456px;
  padding: 15px 13px 15px 23px;
  height: 49px;
  max-width: unset;
}
</style>
