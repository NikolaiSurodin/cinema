<template>
  <div
      class="custom-badge"
      :style="{ 'backgroundColor': bg }"
  >
    <p>{{ title }}</p>
    <div
        class="custom-badge__remove"
        v-if="isRemove"
        @click="$emit('remove')"
    >
      X
    </div>
  </div>

</template>

<script>
export default {
  name: 'Badge',
  props: {
    title: {
      type: String,
      default: ''
    },
    isRemove: {
      type: Boolean,
      default: false
    },
    bg: {
      type: String,
      default: '#1F3197'
    }
  }
}
</script>

<style lang="scss">
.custom-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 5px;

  color: white;

  p {
    margin-bottom: 0;
    font-weight: 100;
  }

  &__remove {
    margin-left: 5px;
    cursor: pointer;
    border-left: 1px solid white;
    padding: 0 0 0 8px;
  }
}

</style>