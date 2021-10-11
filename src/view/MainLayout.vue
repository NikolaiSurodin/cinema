<template>
  <div>
    <div class="header-search">
      <b-form-input class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
    </div>
    <h1 class="title">Cinema</h1>
    <div class="layout" v-if="filteredFilm.length">
      <film-card v-for="film in filteredFilm" :key="film.id"
                 :film="film"
      />
    </div>
    <div class="no-film" v-else>No film</div>
<!--    <footer class="footer">-->
<!--      <div class="info-section">-->
<!--        <div class="footer-section">-->
<!--          <p class="section-heading">Product Collection</p>-->
<!--          <div class="section-content">-->
<!--            <ul>-->
<!--              <li>Current and Forecast APIs</li>-->
<!--              <li>Historical Weather Data</li>-->
<!--              <li>Weather Maps</li>-->
<!--              <li>Widgets</li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="footer-section">-->
<!--          <p class="section-heading">Subscription</p>-->
<!--          <div class="section-content">-->
<!--            <ul>-->
<!--              <li>How to start</li>-->
<!--              <li>Pricing</li>-->
<!--              <li>FAQ</li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="footer-section">-->
<!--          <p class="section-heading">About us</p>-->
<!--          <div class="section-content">-->
<!--            <p>OpenWeather is a team of IT experts and data scientists that has been practising deep weather data-->
<!--              science-->
<!--              since 2014. For each point on the globe, OpenWeather provides historical, current and forecasted weather-->
<!--              data-->
<!--              via light-speed APIs. Headquarters in London, UK.</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="socal-section">-->
<!--        <a href="#"><img src="../assets/social/icon_facebook.png" height="80" width="39"/></a>-->
<!--        <a href="#"> <img href="#" src="../assets/social/icon_twitter.png" height="80" width="39"/></a>-->
<!--        <a href="#"> <img src="../assets/social/icon_telegram.png" height="80" width="39"/></a>-->
<!--        <a href="#"> <img src="../assets/social/icon_github.png" height="80" width="39"/></a>-->
<!--      </div>-->
<!--    </footer>-->
    <app-footer />
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard"
import AppFooter from "@/components/AppFooter"

import {mapActions, mapGetters} from "vuex"

export default {
  name: "MainLayout",
  data() {
    return {
      search: ''
    }
  },
  components: {
    FilmCard,
    AppFooter
  },
  methods: {
    ...mapActions( [ 'fetchFilmList' ] )
  },
  computed: {
    ...mapGetters( [ 'getFilmList' ] ),
    filteredFilm() {
      return this.getFilmList.filter( el => el.title.toLowerCase().includes( this.search.toLowerCase() ) )
    }
  },

  created() {
    this.fetchFilmList()
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}

.layout {
  display: grid;
  /* grid-template-rows: 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr 1fr;
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

</style>