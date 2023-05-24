<template>
  <div class="film">
    <BackButton/>
    <div v-if="loading" class="main-layout-spinner">
      <b-spinner class="main-layout-spin" type="grow"></b-spinner>
    </div>
    <template v-else>
      <div class="film__card">
        <img
            class="film__bg"
            :src="getIMG_URL+film.backdrop_path"
            alt="bg"
        >
        <div class="film__info">
          <div class="film__poster-image">
            <img :src="getIMG_URL+film.poster_path" alt="image">
          </div>
          <div class="film__wrapper">
            <div class="film__title">
              <p class="film__name">{{ film.title }}
                ({{ new Date( film.release_date ).getFullYear() }})</p>
              <div class="film__info-film">
                <p class="film__date">
                  {{ film.release_date }}
                </p>

                <div class="film__genres">
                  <Badge
                      v-for="genre in film.genres"
                      :key="genre.id"
                      :title="genre.name"
                      bg="#01b4e4"
                  />
                </div>
              </div>
            </div>
            <div class="film__description">
              Overview:
              <p>{{ film.overview }}</p>
            </div>
            <div class="film__actions">
              <b-button variant="light"
                        type="button"
                        class="btn-sm"
                        title="Like this film"
                        :disabled="like"
                        @click.stop="likesFilm(film)"
                        v-if="getIsLoggedIn"
              >
                <img src="../assets/like_favorite_heart_5759.png"/>
              </b-button>
              <button
                  class="button button-like"
                  style="height: 45px;"
                  @click="showVideo"
              >
                <b-icon icon="play" aria-hidden="true"></b-icon>
                Info video
              </button>
              <button
                  class="button button-primary"
                  @click="showSimilarFilmLIst"
              >
                similar films
              </button>
            </div>

          </div>
        </div>
        <div class="film__actors container">
          <actors-slider :actor-list="actors"
                         @toActor="toActor"
          />
        </div>
      </div>
      <div class="film__similar-films" v-if="similar" ref="similar">
        <film-table :film-list="similarFilmList"/>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import BackButton from '@/components/_partial/BackButton'
import FilmTable from '@/components/FilmTable'
import ActorsSlider from '@/components/slider/ActorsSlider'
import Badge from "./UI/Badge.vue";

import { getVideo, getInfoFilm, getSimilarFilmList } from '@/services/film.service'

export default {
  name: 'FilmItem',
  components: {
    FilmTable,
    ActorsSlider,
    BackButton,
    Badge
  },
  data() {
    return {
      like: false,
      loading: true,
      similar: false,
      film: {},
      similarFilmList: []
    }
  },
  computed: {
    ...mapGetters( [
      'getIsLoggedIn',
      'getIMG_URL',
      'getFilm'
    ] ),

    actors() {
      return _.get( this.film, 'credits.cast', [] )
    }
  },
  created() {
    this.fetchFilmInfo()
  },
  methods: {
    ...mapActions( [ 'addLikeFilm', 'fetchSimilarFilms' ] ),

    fetchFilmInfo() {
      getInfoFilm( this.$route.params.id, { append_to_response: 'credits' } )
          .then( ( response ) => {
            this.film = response
            this.loading = false
          } )
    },
    likesFilm( film ) {
      this.addLikeFilm( film )
          .then( () => {
            this.like = true
            this.$popup.toast( 'this movie was added to the "Like" list' )
          } )
          .catch( () => {
            this.$popup.error( 'This film in you favorite list already' )
          } )
    },
    toActor( id ) {
      this.$router.push( `/actor/${ id }` )
    },
    showSimilarFilmLIst() {
      this.similar = true
      getSimilarFilmList( this.$route.params.id )
          .then( ( response ) => {
            this.similarFilmList = response
            this.$refs[ 'similar' ].scrollIntoView( { behavior: 'smooth', block: 'start', inline: 'start' } )
          } )
    },
    showVideo() {
      getVideo( this.$route.params.id )
          .then( ( videoList ) => {
            this.$popup.video( videoList[ Math.floor( Math.random() * videoList.length ) ].key )
          } )
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/media-mixin.scss";
@import "@/assets/variables";

.film {
  min-height: 70vh;
  color: $text;

  &__card {
    position: relative;
    background-image: linear-gradient(to right, rgba(10.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(10.5, 31.5, 52.5, 0.84) 50%, rgba(10.5, 31.5, 52.5, 0.84) 100%);
  }

  &__bg {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    object-fit: cover;
    z-index: -1;
  }

  &__poster-image {
    width: 300px;
    height: 450px;
    flex-shrink: 0;

    img {
      object-fit: cover;
    }
  }

  &__name {
    font-size: 32px;
  }

  &__info {
    padding: 110px 100px 0 100px;
    display: flex;

    @include laptop {
      padding: 100px 10px 0 10px;
    }

    @include tablet {
      flex-direction: column;
      align-items: center;
    }

  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    padding-left: 50px;

    @include tablet {
      padding-left: 10px;
    }
  }

  &__info-film {
    display: flex;
    justify-content: flex-start;
    font-size: 24px;
    gap: 10px;
  }

  &__film-date {
    padding-right: 20px;
  }

  &__description {
    padding-top: 20px;

    P {
      padding-top: 15px;
      font-size: 20px;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 32px;

    button {
      margin: 0 3px;
    }

    @include mobile {
      flex-direction: column;
      row-gap: 10px;
      padding: 10px;
    }
  }

  &__date {
    display: flex;
    background-color: #b6ff9e;
    padding: 5px 10px;
    margin-bottom: 0;
    height: 35px;
    flex-shrink: 0;
  }

  &__genres {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
  }
}
</style>