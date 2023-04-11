<template>
    <div class="back-button" role="button" @click="goBack">
        <div class="back-button__text">
            <b-icon icon="arrow-left"></b-icon>
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
@import "@/assets/media-mixin.scss";

.back-button {
  position: absolute;
  left: 1rem;
  top: 10rem;
  z-index: 99;
  border: 1px solid rgba(1, 180, 228, 1);;
  border-radius: 50%;
  padding: 10px;
  transition: all 0.2s;

  @include laptop {
    display: none;
  }
  &:hover {
    transform: scale(1.1);
  }


  &__text {
    color: rgba(1, 180, 228, 1);

    .b-icon.bi {
      font-size: 28px;
    }
  }
}
</style>