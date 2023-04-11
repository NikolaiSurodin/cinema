<template>
  <div class="search-dropdown">
    <div class="search-dropdown__chosen-menu">
      <div
          class="search-dropdown__chosen-item"
          v-for="item in chosenWordList"
          :key="item.id"
          @click="removeChosenWord( item )"
      >
        {{ item.name }}
      </div>
    </div>
    <input
        placeholder="key word"
        @input="handleInput( $event.target.value )"
        :value="value"
    />
    <template v-if="keyWordList.length">
      <div class="search-dropdown__password-icon" @click="clearSearch">X</div>
      <div class="search-dropdown__menu">
        <div
            class="search-dropdown__item"
            v-for="word in keyWordList"
            :key="word.id"
            @click="chooseWord( word )"
        >
          {{ word.name }}
        </div>
      </div>
    </template>

  </div>
</template>

<script>

export default {
  name: 'SearchDropdown',
  components: {},
  data() {
    return {}
  },
  props: {
    value: {
      type: [ String, Number ],
      default: ''
    },
    keyWordList: {
      type: Array,
      default: () => ( [] )
    },
    chosenWordList: {
      type: Array,
      default: () => ( [] )
    }
  },
  methods: {
    handleInput( value ) {
      this.$emit( 'input', value )
    },
    chooseWord( item ) {
      this.$emit( 'chooseWord', item )
    },
    removeChosenWord( word ) {
      this.$emit( 'removeChosenWord', word )
    },
    clearSearch() {
      this.$emit( 'clearSearch' )
    }
  }
}
</script>

<style lang="scss">
.search-dropdown {
  color: black;


  &__menu {
    background-color: white;
    max-height: 250px;
    overflow-y: auto;
    padding: 20px;
    width: 100%;
  }

  &__item {
    &:hover {
      background-color: #1F3197;
      opacity: 0.6;
      cursor: pointer;
      border-radius: 5px;
      padding: 3px;
    }
  }

  &__chosen-menu {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  &__chosen-item {
    margin: 3px;
    padding: 0 8px;
    border-radius: 5px;
    background-color: #1F3197;
    color: white;
    cursor: pointer;
  }

  &__password-icon {
    text-align: end;
    padding: 10px 25px;
    cursor: pointer;
  }
}

input {
  padding: 20px;
  margin-top: -6px;
  border: 0;
  border-radius: 0;
  background: #f1f1f1;
  width: 100%;
}
</style>