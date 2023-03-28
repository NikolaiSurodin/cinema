<template>
    <div class="back-button" role="button" @click="goBack">
        <div class="back-button__text">
            back
        </div>
    </div>
</template>

<script>
export default {
    name: 'BackButton',
    methods: {
        goBack() {
            this.$router.back()
        }
    }

}
</script>

<style scoped lang="scss">
.back-button {
  position: absolute;
  left: 0;
  top: 30rem;
  transform: rotate(270deg);
  z-index: 99;


  &__text {
    font-size: 56px;
    color: rgba(1,180,228, 1);
  }
}
</style>