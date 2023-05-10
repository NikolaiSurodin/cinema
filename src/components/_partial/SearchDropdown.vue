<template>
    <div class="search-dropdown">
        <div class="search-dropdown__chosen-menu">
            <Badge
                    v-for="item in chosenWordList"
                    :key="item.id"
                    :title="item.name"
                    :is-remove="true"
                    bg="#01b4e4"
                    @remove="removeChosenWord( item )"
            />
        </div>
        <input
                placeholder="key word"
                @input="handleInput( $event.target.value )"
                :value="value"
        />
        <template v-if="keyWordList.length">
            <div
                    class="search-dropdown__top-close"
                    @click="clearSearch"
            >
                <span>X</span>
            </div>
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
import Badge from "../UI/Badge.vue";

export default {
    name: 'SearchDropdown',
    components: {
        Badge
    },
    data() {
        return {}
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        keyWordList: {
            type: Array,
            default: () => ([])
        },
        chosenWordList: {
            type: Array,
            default: () => ([])
        }
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value)
        },
        chooseWord(item) {
            this.$emit('chooseWord', item)
        },
        removeChosenWord(word) {
            this.$emit('removeChosenWord', word)
        },
        clearSearch() {
            this.$emit('clearSearch')
        }
    }
}
</script>

<style lang="scss">
.search-dropdown {
  color: black;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }


  &__menu {
    background-color: white;
    max-height: 250px;
    overflow-y: auto;
    width: 100%;
  }

  &__item {
    cursor: pointer;
    padding: 3px;

    &:hover {
      background-color: #01b4e4;

      border-radius: 5px;
      color: white;
    }
  }

  &__chosen-menu {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    gap: 8px;
    margin-bottom: 15px;
  }

  &__top-close {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 0 15px;
    margin-top: 8px;

    span {
      cursor: pointer;
    }
  }
}

input {
  border: 0;
  border-radius: 0;
  background: #f1f1f1;
  width: 100%;
  padding: 10px;
  font-size: 24px;
}
</style>