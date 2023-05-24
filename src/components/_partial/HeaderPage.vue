<template>
  <div class="page-header">
    <div class="page-header__content">
      <div class="page-header__title">
        Welcome.
      </div>
      <div class="page-header__description">
        Millions of movies, TV shows and people to discover. Explore now.
      </div>
      <div class="page-header__input">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/_partial/CustomInput.vue";

export default {
  name: "HeaderPage",
  components: { CustomInput }
}
</script>


<style scoped lang="scss">
.page-header {
  position: relative;
  z-index: 2;
  min-height: 350px;
  background-image: linear-gradient(to right, rgba(27, 68, 101, 0.8) 0%, rgba(93, 84, 84, 0) 100%), url('./../../assets/images/main-title-image.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  display: flex;
  margin: 0 auto;
  width: 100%;
  justify-content: center;


  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 15px;
  }

  &__title {
    font-size: 3em;
    font-weight: 700;
    line-height: 1;
  }

  &__description {
    font-size: 2em;
    font-weight: 600;
    margin: 0;
  }

  &__input {
    display: flex;
    justify-content: center;
  }
}
</style>