<template>
  <div class="container">
    <div class="genres">
      <div class="genres__item"
           v-for="genre in getGenresList" :key="genre.id"
           :class="{'genres__item_active':genre.isActive}"
           @click="selectGenre(genre)"
      >
        {{ genre.name }}
      </div>
      <div class="genres__button">
        <b-button class="genres__button_button"
                  v-if="activeGenre.length"
                  @click="search">
          Search
        </b-button>
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
      this.activeGenre = [ ...this.getGenresList.filter( el => el.isActive ) ]
    },
    search() {
      let a = this.activeGenre.map( ( el ) => ({
            id: el.id,
            name: el.name
          })
      )
      let ids = []
      for ( let i = 0; i < a.length; i++ ) {
        ids.push( a[ i ].id )
      }
      let names = []
      for ( let i = 0; i < a.length; i++ ) {
        names.push( a[ i ].name )
      }
      this.fetchListByGenre( { genres: ids, page: 1 } )
          .then( () => {
            this.$router.push( { path: '/films', query: { genres: `${ names }` } } )
          } )
    }
  },
  computed: {
    ...mapGetters( [ 'getGenresList' ] ),
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

.genres__item_active {
  text-decoration: underline;
  font-size: 20px;
}
</style>