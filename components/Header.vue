<template>
<header>
  <span class='fs-22 text-white'>Arvan Challenge</span>
  <span class='fs-16 text-white ml-3 pl-1'>Welcome {{parseJwt().username}}</span>
  <button class="btn btn-logOut ml-auto" @click="logout()">logout</button>
</header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      this.conventionToken('')
      if (process.client) window.location.href = '/'
    },
  },
}
</script>

<style scoped>
header{
  height: 60px;
  background-color: #373a3c;
  padding: 0 30px 0 20px;
  display: flex;
  align-items: center;
}
.btn-logOut{
  border: 1px solid #5bc0de;
  color: #5bc0de;
  height: 40px;
  width: 87px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
