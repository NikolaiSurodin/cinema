<template>
    <div
            class="container genres"
            v-if="getGenresList.length"
    >

        <div class="genres__list">
            <div class="genres__item"
                 v-for="genre in getGenresList"
                 :key="genre.id"
                 :class="{ 'genres__item--active': getActiveGenreListIdList.includes( genre.id ) }"
                 @click="selectGenre(genre)"
            >
                {{ genre.name }}
            </div>
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
            activeGenreList: [],
        }
    },
    props: {
        activeG: {
            type: Array
        }
    },
    methods: {
        ...mapActions(
            [
                'fetchGenres',
                'clearGenresList',
                'selectedGenre',
                'fetchListByGenre',
            ] ),
        selectGenre( genre ) {
            this.selectedGenre( genre )
        },
        remove() {
            this.activeGenreList = []
            this.$emit( 'remove' )
        }
    },
    computed: {
        ...mapGetters( [ 'getGenresList', 'getActiveGenreList', 'getActiveGenreListIdList' ] )
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &__item {
    display: inline-flex;
    border: 1px solid #9e9e9e;
    border-radius: 14px;
    padding: 4px 12px;
    font-size: 0.9em;
    margin-right: 6px;
    margin-top: 8px;
    background-color: white;

    &:hover {
      background-color: #1F3197;
      color: white;
      cursor: pointer;
    }

    &--active {
      background-color: #5162ce !important;
      color: white;
    }
  }
}


</style>