<template>
  <div>
    <main-header/>
    <div class="main_title">
      You favorite movie.
    </div>
    <div class="no-favorite-text" v-if="!getFavoriteFilms.length">
      no movies you liked. Let's go choose?
    </div>
    <div class="layout"
         :class="{'table-like':getFavoriteFilms.length < 3 }">
      <div v-for="film in getFavoriteFilms" :key="film.id">
        <film-card :film="film"
                   @clickOnFilm="toFilm(film.id)"
                   @deleteLikeFilm="removeLikeFilms(film)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FilmCard from "@/components/FilmCard"
import MainHeader from "@/components/MainHeader"

export default {
  name: "FavoriteFilms",
  components: { FilmCard, MainHeader },
  methods: {
    ...mapActions( [ 'fetchFavoriteFilmList', 'deleteLikeFilm' ] ),
    removeLikeFilms( f ) {
      this.deleteLikeFilm( f )
          .then( () => {
            if ( !this.getFavoriteFilms.length ) {
              this.$popup.success( 'You have not favorite films', 'OK!' )
                  .then( () => this.$router.push( '/films' ) )
            }
          } )
    },
    toFilm( id ) {
      this.$router.push( `/films/${ id }` )
    }
  },
  computed: {
    ...mapGetters( [ 'getFavoriteFilms' ] ),
    films() {
      return this.getFavoriteFilms
    }
  },
  created() {
    this.fetchFavoriteFilmList()
  }
}
</script>

<style scoped>
.table-like {
  /*grid-template-columns: 1fr 1fr 1fr;*/
  grid-template-columns: minmax(200px, 300px) minmax(200px, 300px) minmax(200px, 300px);
}

@media (max-width: 450px ) {
  .table-like {
    /*grid-template-columns: minmax(200px,300px);*/
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  }
}
</style>