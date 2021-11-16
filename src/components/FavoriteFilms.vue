<template>
  <div>
    <main-header/>
    <div class="layout"
         :class="{'table-like':getFavoriteFilms.length < 3 }">
      <div v-for="film in getFavoriteFilms" :key="film.id">
        <film-card :film="film" @deleteLikeFilm="deleteLikeFilm(film)"/>
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
    ...mapActions( [ 'removeLikeFilm' ] ),
    deleteLikeFilm( f ) {
      this.removeLikeFilm( f )
          .then( () => {
            if ( !this.getFavoriteFilms.length ) {
              this.$popup.success( 'You have not favorite films', 'OK!' ).then( () => this.$router.push( '/films' ) )
            }
          } )
    }
  },
  computed: {
    ...mapGetters( [ 'getFavoriteFilms' ] )
  }
}
</script>

<style scoped>
.table-like {
  grid-template-columns: 1fr 1fr 1fr;
}
</style>