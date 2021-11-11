<template>
  <div class='container d-flex justify-content-center align-items-center vh-100'>
    <div class='mx-auto' style='background-color: #eceeef;width: 450px;padding: 35px 20px 20px 20px'>
      <input v-model='email' class='form-control' placeholder='email'>
      <input v-model='username' class='form-control' placeholder='username'>
      <input v-model='password' class='form-control' placeholder='password'>
      <button>submit</button>
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
  }
}
</script>

<style scoped>

</style>
