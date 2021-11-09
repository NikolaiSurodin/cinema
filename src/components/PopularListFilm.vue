<template>
  <div class="wrapper">
    <header class="header">
      <main-header/>
    </header>
    <main class="main">
      <template>
        <div class="layout">
          <film-card v-for="film in getPopularFilmList" :key="film.id"
                     :film="film"
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
      return  this.$route.hash.replace('#page=', '')
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
    }
  },
  created() {
    this.fetchPopularFilmList( `${ this.page }` )
  }
}
</script>

<style scoped>

</style>