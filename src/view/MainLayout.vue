<template>
  <div>
    <div class="header-search">
      <b-form-input class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
      <b-button v-if="!filteredFilm.length" @click="globalSearch">Global Search</b-button>
    </div>
    <h1 class="title">Cinema</h1>
    <template v-if="loading">
      <b-spinner class="main-layout-spin" type="grow"></b-spinner>
    </template>
    <template>
      <div class="layout" v-if="filteredFilm.length">
        <film-card v-for="film in filteredFilm" :key="film.id"
                   :film="film"
        />

      </div>
      <div class="no-film" v-else>No film</div>

      <div class="layout" v-if="isGlobalFilm">
        <film-card :film="getGlobalFilm[0]"
        />
      </div>
    </template>
    <div class="load-button">
      <b-button style="background-color: inherit" @click="add" :disabled="!filteredFilm.length">Loading</b-button>
      <button-to-up @goToUpPage="goToUpPage"/>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard"
import AppFooter from "@/components/AppFooter"
import ButtonToUp from "@/components/ButtonToUp"

import { mapActions, mapGetters } from "vuex"

export default {
  name: "MainLayout",
  data() {
    return {
      search: '',
      globalFilm:{},
      loading: true,
      currentPage: 2,
      global: false
    }
  },
  components: {
    FilmCard,
    AppFooter,
    ButtonToUp
  },
  methods: {
    ...mapActions( [ 'fetchFilmList', 'fetchOnPageFilms', 'globalSearchFilm', 'removeGlobalFilm' ] ),
    add() {
      const query = { ...this.$route.query, page: this.currentPage++ };
      this.$router.replace( { query } );
      this.fetchOnPageFilms( this.$route.query.page )
    },
    goToUpPage() {
      window.scrollTo( 0, 0 )
    },
    globalSearch() {
      this.globalSearchFilm(this.search.toLowerCase())
    }
  },
  computed: {
    ...mapGetters( [ 'getFilmList','getGlobalFilm' ] ),
    filteredFilm() {
      return this.getFilmList.filter( el => el.title.toLowerCase().includes( this.search.toLowerCase() ) )
    },
    isGlobalFilm() {
      // есть ли глабл фильм вообще
      return Object.keys(this.getGlobalFilm).length !== 0
    },
    gFilm() {
      return this.getGlobalFilm[0]
    }
  },
  mounted() {
    this.fetchFilmList()
    .then(() => {
      this.loading = false
      this.removeGlobalFilm()
    })
  }
}
</script>

<style scoped>
@media (max-width: 500px) {
  .layout {
    grid-template-columns: 1fr 1fr;
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
  width: 20rem;
  margin-top: 20px;
}

.no-film {
  display: flex;
  justify-content: center;
  font-size: 37px;
  margin-top: 10rem;
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
</style>