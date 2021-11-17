<template>
  <div class="container">
    <div class="genres">
      <div class="genres__item"
           v-for="genre in getGenresList" :key="genre.id"
           :class="{'genres__item_underline':genre.isActive}"
           @click="selectGenre(genre)"
      >
        {{ genre.name }}
      </div>
      <div class="genres__button">
        <b-button @click="search">Search</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "GenresList",
  data() {
    return {
      on: false,
      activeGenre: [],
    }
  },
  methods: {
    ...mapActions( [ 'fetchGenres', 'clearGenresList', 'selectedGenre', 'fetchListByGenre' ] ),
    selectGenre( genre ) {
      this.selectedGenre( genre )
      this.arr = [ ...this.getGenresList.filter( el => el.isActive ) ]
    },
    search() {
      let a = this.arr.map( ( el ) => ({
            id: el.id
          })
      )
      let ids = []
      for ( let i = 0; i < a.length; i++ ) {
        ids.push( a[ i ].id )
      }
      this.fetchListByGenre(ids)
    }
  },
  computed: {
    ...
        mapGetters( [ 'getGenresList' ] ),
  },
  created() {
    this.fetchGenres()
  },
  beforeDestroy() {
    this.clearGenresList()
  }
}
</script>

<style scoped>
.genres {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #3e3e3e;
}

.genres__item {
  padding: 10px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;

}

.genres__item_underline {
  text-decoration: underline;
}
</style>