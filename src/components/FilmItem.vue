<template>
  <div>
    <main-header/>
    <div v-if="loading" class="text-center mt-5">
      <b-spinner class="main-layout-spin" type="grow"></b-spinner>
    </div>

    <div class="wrapper-card" v-else>
      <section class="film-card">

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
            <div class="actions-item">

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
              <p style="cursor: pointer" @click="showRecomend">similar films</p>
            </div>
          </b-card-text>
        </b-card>
      </section>
    </div>
    <div class="slider-card">
      <slider :film="film"/>
    </div>
    <div class="table" v-if="similar">
      <recomend-table/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RecomendTable from "@/components/RecomendTable"
import MainHeader from "@/components/MainHeader"
import slider from '@/components/actorPages/ActorsSlider'
import { getVideo } from "@/services/film.service"


export default {
  name: "FilmItem",
  components: { RecomendTable, MainHeader, slider },
  data() {
    return {
      like: false,
      loading: true,
      similar: false,
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
    ...mapActions( [ 'fetchInfoDetailFilm', 'clearFIlmItem', 'addLikeFilm', 'fetchSimilarFilms' ] ),
    likesFilm( film ) {
      this.addLikeFilm( film )
          .then( () => {
            this.like = true
            this.$popup.toast('this movie was added to the "Like" list')
          } )
          .catch( () => {
            this.$popup.error( 'This film in you favorite list already' )
          } )
    },
    showRecomend() {
      this.similar = true
      this.fetchSimilarFilms( this.$route.params.id )
    },
    showVideo() {
      getVideo( this.$route.params.id )
          .then( ( video ) => {
            this.$popup.video( video.key )
          } )
    }
  },
  mounted() {
    this.fetchInfoDetailFilm( this.$route.params.id )
        .then( () => {
          this.loading = false
        } )
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

  .actions-item {
    position: relative;
    margin-top: 16px;
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

.actions-item {
  display: flex;
  text-align: center;
  justify-content: space-between;
  position: relative;
  bottom: 0;
  width: 97%;
  align-items: center;
  padding-bottom: 6px;

}

.card-body {
  position: relative;
}
h1 {
  font-size: 22px;
}
</style>