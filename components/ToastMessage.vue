<template>
  <div
    class="toast position-fixed align-items-center d-flex"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div
      class="
          toast-body
          fs-16
          p-0
          d-flex
          align-items-center
          justify-content-around
          w-100
        "
    >
      <span class="font-weight-bold mr-1"> Login Failed! </span>
      User name and/or Password is invalid
      <button
        type="button"
        class="ml-auto mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
        @click="$('.toast').toast('hide')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastMessage'
}
</script>

<style scoped>

</style>
