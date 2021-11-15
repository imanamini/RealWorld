<template>
  <div class="sidenav">
    <div class="fs-22 text-white mb-3 ml-3 pl-1">Post</div>
    <nuxt-link
      to="/articles"
      :class="
        !checkUrl('create') && !checkUrl('edit')
          ? 'sidenav__btn-navigate--active'
          : ''
      "
      class="btn text-left text-white fs-18 sidenav__btn-navigate"
    >
      All Articles
    </nuxt-link>
    <nuxt-link
      to="/articles/create"
      :class="
        checkUrl('create') || checkUrl('edit')
          ? 'sidenav__btn-navigate--active'
          : ''
      "
      class="btn text-left text-white fs-18 sidenav__btn-navigate"
    >
      New Article
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Sidenav',
}
</script>

<style scoped>
.sidenav {
  background-color: #1c7cd5;
  position: fixed;
  top: 60px;
  min-height: 100vh;
  width: 250px;
  padding-top: 13px;
}
.sidenav__btn-navigate {
  width: 100%;
  padding-left: 34px;
  padding-top: 11px;
  padding-bottom: 11px;
}
.sidenav__btn-navigate--active {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
