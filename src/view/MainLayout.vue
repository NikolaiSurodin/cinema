<template>
  <div class="wrapper">
    <header class="header">
      <main-header/>
    </header>
    <main class="main">
      <div class="header-search">
        <b-input class="mr-sm-2"
                 placeholder="Search film..."
                 v-model="search"
                 @keyup.enter="globalSearch"
        ></b-input>
      </div>
      <div class="pop d-flex justify-content-center">
        <b-button class="mt-2" style="background: unset">What`s popular?</b-button>
      </div>
      <template v-if="loading">
        <b-spinner class="main-layout-spin" type="grow"></b-spinner>
      </template>
      <template>
        <div class="welcome-text">
          <div class="text-title">
            <p>Welcome</p>
          </div>
          <p>Millions of movies, TV shows and people. Explore now.</p>
        </div>
      </template>
      <template>
        <div class="layout" v-if="filteredFilm.length">
          <film-card v-for="film in filteredFilm" :key="film.id"
                     :film="film"
                     @clickOnFilm="toFilm(film.id)"
          />
        </div>
        <div class="layout" v-if="isGlobalFilm">
          <film-card :film="getGlobalFilm[0]"
                     @clickOnFilm="toFilm(getGlobalFilm[0].id)"
          />
        </div>
      </template>
      <div class="load-button">
        <b-button style="background-color: inherit" @click="add" :disabled="!filteredFilm.length">Loading</b-button>
        <button-to-up @goToUpPage="goToUpPage"/>
      </div>
    </main>
    <footer class="footer">
      <app-footer/>
    </footer>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard"
import AppFooter from "@/components/AppFooter"
import ButtonToUp from "@/components/ButtonToUp"
import MainHeader from "@/components/MainHeader"

import { mapActions, mapGetters } from "vuex"

export default {
  name: "MainLayout",
  data() {
    return {
      search: '',
      globalFilm: {},
      loading: true,
      currentPage: 2,
      global: false,

    }
  },
  components: {
    FilmCard,
    AppFooter,
    ButtonToUp,
    MainHeader
  },
  methods: {
    ...mapActions( [ 'fetchFilmList', 'fetchOnPageFilms', 'globalSearchFilm', 'removeGlobalFilm' ] ),
    toFilm( id ) {
      this.$router.push( `/films/${ id }` )
    },
    add() {
      const query = { ...this.$route.query, page: this.currentPage++ }
      this.$router.replace( { query } )
      this.fetchOnPageFilms( this.$route.query.page )
    },
    goToUpPage() {
      window.scrollTo( 0, 0 )
    },
    globalSearch() {
      this.globalSearchFilm( this.search.toLowerCase() )
    },
  },
  computed: {
    ...mapGetters( [ 'getFilmList', 'getGlobalFilm' ] ),
    filteredFilm() {
      return this.getFilmList.filter( el => el.title.toLowerCase().includes( this.search.toLowerCase() ) )
    },
    isGlobalFilm() {
      // есть ли глабл фильм вообще
      return Object.keys( this.getGlobalFilm ).length !== 0
    }
  },
  mounted() {
    this.fetchFilmList()
        .then( () => {
          this.loading = false
          this.removeGlobalFilm()
          if ( !this.isGlobalFilm ) {
            this.$router.replace( '/films' )
          }
        } )
  }
}
</script>

<style scoped>
@media (max-width: 500px) {
  .layout {
    display: grid;
    grid-gap: 2vw;
    padding: 4px;
    grid-template-columns: 1fr;
  }
}

.title {
  text-align: center;
}

.layout {
  display: grid;
  /*grid-template-rows: 1fr 1fr 1fr;*/
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2vw;
  padding: 4px;
}

.header-search {
  padding: 0 12em;
  margin-top: 6px;
  display: flex;
  justify-content: center;
  height: 50px;
}

.load-button {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}

.btn-secondary:hover {
  background-color: inherit;
}

.main-layout-spin {
  position: absolute;
  top: 10rem;
  left: 49%;
}

.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 1 auto;
}
.welcome-text {
  margin-left: 4em;
  display: block;
  border-left: 1px solid;
}
.text-title p {
  font-size: 44px;
  font-family: fantasy;
  line-height: 2;
  letter-spacing: 8px;
}
p {
  font-size: 20px;
  font-family: sans-serif;
}
</style>