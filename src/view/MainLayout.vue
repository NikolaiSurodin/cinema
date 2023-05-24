<template>
  <div class="main-page" ref="test" @scroll="handleScroll">
    <div class="main-page__header">
      <HeaderPage>
        <custom-input
            v-model="search"
            :is-scale="true"
            :search="search"
            @searchFilm="searchFilm"
            placeholder="search for movie"
        />
      </HeaderPage>
    </div>
    <div class="main-page__film-list">
      <template v-if="loading">
        <b-spinner class="main-layout-spinner" type="grow"></b-spinner>
      </template>
      <template v-else>
        <div class="main-page__left-side">
          <filter-side-bar
              :is-show-input-search="isShowInputSearch"
              @searchFilms="fetchFilmList"
              @clearFilter="fetchFilmList"
          />
        </div>
        <div class="main-page__right-side">
          <film-table
              :film-list="films"
              @loadData="loadData"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/_partial/CustomInput'
import FilmTable from '@/components/FilmTable'
import HeaderPage from "@/components/_partial/HeaderPage.vue";

import { mapActions, mapGetters, mapState } from 'vuex'

import { filmList } from '@/services/film.service'
import FilterSideBar from '@/components/FilterSideBar'

export default {
  name: 'MainLayout',
  components: {
    CustomInput,
    FilmTable,
    FilterSideBar,
    HeaderPage
  },
  data() {
    return {
      isShowInputSearch: false,
      search: '',
      globalFilm: {},
      activeFilmId: '',
      loading: true,
      currentPage: 1,
      global: false,
      films: []
    }
  },
  created() {
    window.addEventListener( 'scroll', this.handleScroll );
  },
  destroyed() {
    window.removeEventListener( 'scroll', this.onScroll );
  },
  mounted() {
    this.fetchFilmList()
  },
  methods: {
    ...mapActions(
        [
          'fetchFilmList',
          'fetchOnPageFilms',
          'fetchListByGenre',
          'clearFilmListByGenre',
          'clearGenderFilter'
        ] ),
    fetchFilmList() {
      filmList( this.getPayloadFilter )
          .then( ( result ) => {
            this.films = result
            this.loading = false
          } )
    },
    toFilm( id ) {
      this.$router.push( `/films/${ id }` )
    },
    searchFilm() {
      if ( this.search ) {
        this.$router.push( { path: '/search', query: { search: this.search } } )
      }
    },
    loadData() {
      this.currentPage++

      filmList( {
        with_genres: this.activeFilmId,
        page: this.currentPage
      } )
          .then( ( result ) => {
            this.films = [ ...this.films, ...result ]
            this.loading = false
          } )
    },
    handleScroll() {
      this.isShowInputSearch = window.scrollY >= 358
    }
  },
  computed: {
    ...mapGetters(
        [
          'getFilmList',
          'getGlobalFilm',
          'getUser',
          'getFilmsByGenre',
          'getGenresList',
          'getPayloadFilter'
        ] ),
    ...mapState( [ 'user' ] ),

  }
}
</script>

<style lang="scss">
@import "@/assets/media-mixin.scss";

.main-page {
  &__film-list {
    display: flex;
    position: relative;
    width: 100%;
    @include desktopbig {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
