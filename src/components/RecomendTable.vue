<template>
 <film-table :film-list="recomendFilmList"/>
</template>

<script>
import FilmTable from "@/components/FilmTable"
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "RecomendTable",
  components: {FilmTable},
  props: {
   recomendFilmList:{
     type: Array,
     default: () => []
   }
  },
  methods: {
    ...mapActions(['removeRecomendFilmList']),
    addInfoPopup(film) {
      this.$popup.info(`${film.overview}`, `${film.title}`, `${film.poster_path}`, `${film.overview}`)
    }
  },
  computed: {
    ...mapGetters([])
  }
}
</script>

<style scoped>

</style>