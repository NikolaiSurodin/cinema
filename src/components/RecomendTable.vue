<template>
  <div class="layout">
    <film-card v-for="film in getRecomendFilmList" :key="film.id"
               :film="film"
               @clickOnFilm="addInfoPopup(film)"
    />
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard"
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "RecomendTable",
  components:{FilmCard},
  methods:{
    ...mapActions(['removeRecomendFilmList']),
    addInfoPopup(film) {

      this.$popup.info(`${film.overview}`, `${film.title}`,`${film.poster_path}`, `${film.overview}` )
    }
  },
  computed: {
    ...mapGetters( [
      'getRecomendFilmList'
    ] )
  },
  beforeDestroy() {
   this.removeRecomendFilmList()
  }
}
</script>

<style scoped>

</style>