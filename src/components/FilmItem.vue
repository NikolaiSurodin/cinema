<template>
  <div>
    <main-header/>
    <template v-if="loading">
      <b-spinner class="main-layout-spin" type="grow"></b-spinner>
    </template>
    <main v-else>
      <b-card
          :img-src="getIMG_URL+film.backdrop_path"
          img-alt="Image"
          img-left class="card mb-3"

      >
        <b-card-text>
          <h1>{{ film.title }} ({{ new Date( film.release_date ).getFullYear() }})</h1>
          <div class="about">
            <h4>About:</h4>
            {{ film.overview }}
          </div>
          <div class="genres">
            <h4>Genres:</h4>
            <div v-for="genre in film.genres" :key="genre.id">
              {{ genre.name }}
            </div>
          </div>
          <div class="social-footer-card mt-2">
            <div class="social-item">

              <b-button variant="light"
                        type="button"
                        class="btn-sm"
                        title="Like this film"
                        :disabled="like"
                        @click.stop="likesFilm(film)"
              >
                <img src="../assets/like_favorite_heart_5759.png"/>
              </b-button>
              <p style="cursor: pointer" @click="showVideo">
                <b-icon icon="play" aria-hidden="true"></b-icon>
                trailer
              </p>
              <p style="cursor: pointer" @click="showRecomend">show recommendations</p>
            </div>
          </div>
        </b-card-text>
      </b-card>
      <template v-if="recomend">
        <recomend-table/>
      </template>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RecomendTable from "@/components/RecomendTable"
import MainHeader from "@/components/MainHeader"
import { getVideo } from "@/services/film.service"

export default {
  name: "FilmItem",
  components: { RecomendTable, MainHeader },
  data() {
    return {
      like: false,
      loading: true,
      recomend: false,
      searchText: ''
    }
  },
  computed: {
    ...mapGetters( [
      'getIMG_URL',
      'getFilm',
    ] ),
    film() {
      return this.getFilm
    },
  },
  methods: {
    ...mapActions( [ 'fetchInfoDetailFilm', 'clearFIlmItem', 'addLikeFilm', 'fetchRecomendFilms' ] ),
    likesFilm( film ) {
      this.addLikeFilm( film )
          .then( () => {
            this.like = true
            this.$popup.success( 'this movie was added to the "Like" list', 'Like!' )
          } )
          .catch( () => {
            this.$popup.error( 'This film in you favorite list already' )
          } )
    },
    showRecomend() {
      this.recomend = true
      this.fetchRecomendFilms( this.$route.params.id )
    },
    test() {

    },
    showVideo() {
      getVideo( this.$route.params.id )
          .then( ( video ) => {
            this.$popup.video( video.key )
          } )
    }
  },
  mounted() {
    this.fetchInfoDetailFilm( this.$route.params.id ).then( () => this.loading = false )
  },
  beforeDestroy() {
    this.clearFIlmItem()
  }

}
</script>

<style scoped>
.card {
  margin: 5rem;
  height: 100%;
}

@media (max-width: 1144px) {
  .card {
    display: inherit;
    margin: 0;
  }

  img {
    width: 100%;
  }
}

.wrap {
  margin-top: 60px;
  display: grid;
  grid-gap: 2vw;
  padding: 4px;
}

.actors-title {
  padding: 4px;
  font-size: 18px;
}

.card-body {
  background: linear-gradient(
      352deg, black, #626262);
  color: #ffff;
}

.card-title {
  text-align: right;
}

.button-review {
  display: flex;
  justify-content: end;
}

.card-footer {
  display: flex;
  justify-content: center;
  background: linear-gradient(
      180deg, black, #626262);
}

.up-button-block {
  position: relative;
  bottom: -90%;
  left: 100%;
}


.open {
  transform: translateY(10%);
  transition: transform 1s, height 1s 1s;
  width: 100%;
  max-width: 100%;
}

.social-item {
  display: flex;
  text-align: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 97%;
  align-items: center;
  padding-bottom: 6px;
}

.card-body {
  position: relative;
}

.layout {
  display: grid;
  /*grid-template-rows: 1fr 1fr 1fr;*/
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2vw;
  padding: 4px;
}
</style>