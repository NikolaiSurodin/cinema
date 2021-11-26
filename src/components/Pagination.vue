<template>
  <div class="overflow-auto d-flex justify-content-center">
    <div class="mt-3">
      <b-pagination-nav pills size="lg"
                        number-of-pages="10"
                        base-url="#page="
                        @change="clickToPage">
      </b-pagination-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      page: this.currentPage
    }
  },
  props: ['currentPage'],
  methods:{
    clickToPage() {
      this.$emit('clickToPage')
    }
  }
}
</script>

<style scoped>

</style>