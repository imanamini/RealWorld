<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="login mx-auto bg-silver">
      <div class="text-center color-warm-grey fs-47 line-height-56 mb-4">
        LOGIN
      </div>
      <form @submit.prevent="login()">
        <label class="fs-16 color-charcoal-grey pl-2 mt-4">Email</label>
        <input
          v-model="email"
          :class="loginError || requiredEmail ? 'border-danger' : ''"
          type="email"
          class="form-control"
          autocomplete="off"
          @keyup="requiredEmail = false"
        />
        <span
          v-show="loginError || requiredEmail"
          class="position-absolute text-danger"
          >{{
            requiredEmail ? 'Required Field' : 'Email or password incorrect!'
          }}</span
        >
        <label class="fs-16 color-charcoal-grey pl-2 mt-4">Password</label>
        <input
          v-model="password"
          :class="loginError || requiredPassword ? 'border-danger' : ''"
          type="password"
          class="form-control"
          autocomplete="off"
          @keyup="requiredPassword = false"
        />
        <span
          v-show="loginError || requiredPassword"
          class="position-absolute text-danger"
          >{{
            requiredPassword ? 'Required Field' : 'Email or password incorrect!'
          }}</span
        >
        <input class="btn btn-primary w-100 mt-5" type="submit" value="Login" />
      </form>
      <div class="fs-16 color-charcoal-grey line-height-19 mt-2 pt-1">
        <span>Don’t have account?</span>
        <nuxt-link to="/register">
          <span class="font-weight-bold">Register Now</span>
        </nuxt-link>
      </div>
    </div>
    <div
      id="toast"
      class="toast position-fixed align-items-center d-flex"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
      requiredEmail: false,
      requiredPassword: false,
    }
  },
  methods: {
    /**
     * Login user
     *
     * Author: Iman Amini
     * last edit: 1400/08/21 by Iman Amini
     * inspector:
     *
     */
    login() {
      if (!this.email || !this.password) {
        if (!this.email) this.requiredEmail = true
        if (!this.password) this.requiredPassword = true
        this.showToastMessage('<b>Login Failed!</b> User name and/or Password is invalid',true)
        return
      }
      this.$axios
        .post('users/login', {
          user: {
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
          this.loginError = true
          this.$('.toast').toast('show')
        })
    },
  },
}
</script>

<style scoped>
.login {
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
