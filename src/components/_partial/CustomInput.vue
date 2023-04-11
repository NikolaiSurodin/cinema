<template>
  <div
      class="search"
      :class="{ 'search--active-scale': isScale }"
  >
    <input
        class="search__custom-input"
        :placeholder="placeholder"
        @input="handleInput( $event.target.value )"
        @keydown.enter="$emit('searchFilm')"
        :value="value"
    >
    <button
        class="button button-primary"
        v-if="search"
        @click="$emit('searchFilm')"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  data() {
    return {}
  },
  props: {
    value: {
      type: [ String, Number ],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search'
    },
    isScale: {
      type: Boolean,
      default: false
    },
    search: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput( value ) {
      this.$emit( 'input', value )
    }
  }
}
</script>

<style lang="scss">

.search {
  display: flex;
  justify-content: center;
  height: 40px;

  &--active-scale {
    input {
      &:focus {
        width: 400px;
      }
    }
  }

  input {
    width: 250px;
    transition: all 0.4s;
    text-indent: 15px;
  }

  &__custom-input {
    outline: none;
    width: 100%;
    border: 1px transparent;
    border-radius: 4px;
    font-size: 20px;
    margin-right: 15px;
  }

}

</style>