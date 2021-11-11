<template>
  <div class='container d-flex justify-content-center align-items-center vh-100'>
    <div class='register mx-auto bg-silver'>
      <div class='text-center color-warm-grey fs-47 line-height-56 mb-4'>
        Register
      </div>
      <form @submit.prevent='register()'>
          <label class='fs-16 color-charcoal-grey pl-2 mt-4'>User</label>
          <input v-model='username' type='text' class='form-control' autocomplete='off'>
          <label class='fs-16 color-charcoal-grey pl-2 mt-4'>Email</label>
          <input v-model='email' type='email' class='form-control' autocomplete='off'>
          <label class='fs-16 color-charcoal-grey pl-2 mt-4'>Password</label>
          <input v-model='password' type='password' class='form-control' autocomplete='off'>
          <input class='btn btn-primary w-100 mt-5' type="submit" value="Register">
      </form>
      <div class='fs-16 color-charcoal-grey line-height-19 mt-2 pt-1'>
        <span>Already Registered?</span>
        <nuxt-link to='/login'><span class='font-weight-bold'>Login</span></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data(){
    return{
      email:'',
      username: '',
      password:''
    }
  },
  methods:{
    /**
     * Register user
     *
     * Author: Iman Amini
     * last edit: 1400/08/21 by Iman Amini
     * inspector:
     *
     */
    register(){
      this.$axios.post('users', {
        user:{
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then((response) => {
          if (response) {
            this.conventionToken(response.data.user.token)
            this.$router.push('/dashboard')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.register{
  width: 450px;
  padding: 35px 20px 20px 20px;
}
a{
  color: unset;
}
</style>
