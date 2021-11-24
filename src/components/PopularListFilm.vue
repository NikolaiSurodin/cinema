<template>
  <div class="wrapper">
    <header class="header">
      <main-header/>
    </header>
    <main class="main">
      <div class="main_title">
        Popular movies.
      </div>
      <template>
        <div class="layout">
          <film-card v-for="film in getPopularFilmList"
                     :key="film.id"
                     :film="film"
                     @clickOnFilm="toFilm(film.id)"
          />
        </div>
      </template>
      <pagination :current-page="$route.hash"
                  @clickToPage="toPage"/>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FilmCard from "@/components/FilmCard"
import Pagination from "@/components/Pagination"
import MainHeader from "@/components/MainHeader"

export default {
  name: "PopularListFilm",
  data() {
    return {
      currentPage: 1
    }
  },
  components: { FilmCard, Pagination, MainHeader },
  computed: {
    ...mapGetters( [ 'getPopularFilmList' ] ),
    page() {
      return this.$route.hash.replace( '#page=', '' )
    },
  },
  watch: {
    // при изменениях маршрута запрашиваем данные снова
    page: 'fetchPopularFilmList'
  },
  methods: {
    ...mapActions( [ 'fetchPopularFilmList' ] ),
    toPage() {
      this.fetchPopularFilmList( `${ this.page }` )
    },
    toFilm( id ) {
      this.$router.push( `/films/${ id }` )
    }
  },
  created() {
    this.fetchPopularFilmList( `${ this.page }` )
  }
}
</script>

<style scoped>

</style>