<template>
<b-button class="up-button" @click="goToUpPage">
  <b-icon icon="chevron-up"></b-icon>
  </b-button>

</template>

<script>
export default {
  name: "ButtonToUp",
  methods:{
    goToUpPage() {
      this.$emit('goToUpPage')
    }
  }
}
</script>

<style scoped>

.up-button {
  border-radius: 50%;
  height: 45px;
  background-color: inherit;
}

</style>