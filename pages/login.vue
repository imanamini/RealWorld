<template>
  <div class='container d-flex justify-content-center align-items-center vh-100'>
    <div class='login mx-auto bg-silver'>
      <div class='text-center color-warm-grey fs-47 line-height-56 mb-4'>
        LOGIN
      </div>
      <form>
        <label class='fs-16 color-charcoal-grey pl-2 mt-4'>Email</label>
        <input v-model='email' type='email' class='form-control' autocomplete='off'>
        <label class='fs-16 color-charcoal-grey pl-2 mt-4'>Password</label>
        <input v-model='password' type='password' class='form-control' autocomplete='off'>
        <input class='btn btn-primary w-100 mt-5' type="submit" value="Login">
      </form>
      <div class='fs-16 color-charcoal-grey line-height-19 mt-2 pt-1'>
        <span>Don’t have account?</span>
        <span class='font-weight-bold'>Register Now</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      email: '',
      password:''
    }
  },
}
</script>

<style scoped>
.login{
  width: 450px;
  padding: 35px 20px 20px 20px;
}
</style>
