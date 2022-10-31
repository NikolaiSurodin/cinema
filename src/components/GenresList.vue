<template>
    <div
            class="container genres"
            v-if="getGenresList.length"
    >
        <div class="genres__list">
            <div class="genres__item"
                 v-for="genre in getGenresList"
                 :key="genre.id"
                 :class="{'genres__item--active':genre.isActive}"
                 @click="selectGenre(genre)"
            >
                {{ genre.name }}
            </div>
        </div>
        <div class="genres__remove-filter-button" v-if="activeGenre.length">
            <b-button
                    class="genres__button_button"
                    @click="remove"
            >
                Remove you filter
            </b-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'GenresList',
    data() {
        return {
            on: false,
            activeGenre: [],
        }
    },
    props: {
        activeG: {
            type: Array
        }
    },
    methods: {
        ...mapActions( [ 'fetchGenres', 'clearGenresList', 'selectedGenre', 'fetchListByGenre' ] ),
        selectGenre( genre ) {
            this.selectedGenre( genre )
            this.activeGenre = [ ...this.getGenresList.filter( el => el.isActive ) ]
        },
        remove() {
            this.activeGenre = []
            this.$emit( 'remove' )
        }
    },
    computed: {
        ...mapGetters( [ 'getGenresList' ] )
    },
    created() {
        this.fetchGenres()
    },
    beforeDestroy() {
        this.clearGenresList()
    }
}
</script>

<style scoped lang="scss">
.genres {
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #3e3e3e;

  &__list {
    display: flex;
    width: 70%;
    flex-wrap: wrap;
    border-right: 1px solid #3e3e3e;

  }

  &__item {
    padding: 10px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    position: relative;

    &:before {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: white;
      content: "";
      transition: width 0.3s ease-out;
    }

    &:hover:before,
    &:focus:before {
      width: 100%;
    }

    &--active {
      &:before {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: white;
        content: "";
        transition: width 0.3s ease-out;
      }
    }
  }
}


</style>