<template>
  <div
    id="DeleteModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="
              modal-title
              font-weight-bold
              fs-20
              line-height-25
              color-charcoal-grey
            "
          >
            Delete Article
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body fs-16 color-charcoal-grey line-height-1 ml-1">
          Are you sure to delete Article?
        </div>
        <div class="modal-footer p-3">
          <button
            type="button"
            class="btn btn-outline-secondary px-4 my-0"
            data-dismiss="modal"
          >
            No
          </button>
          <button
            type="button"
            class="btn btn-danger px-4 ml-3 my-0 mr-0"
            data-dismiss="modal"
            @click="$emit('delete')"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
}
</script>

<style scoped>
.modal-body {
  padding-top: 22px;
  padding-bottom: 47px;
}
.modal-header {
  padding-top: 19px;
  padding-bottom: 19px;
}
</style>
