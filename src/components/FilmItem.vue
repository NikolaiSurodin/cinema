<template>
    <div>
        <BackButton />
        <div v-if="loading" class="text-center mt-5">
            <b-spinner class="main-layout-spin" type="grow"></b-spinner>
        </div>
        <div
                class="wrapper-card"
                v-else
        >
            <img class="wrapper-card__bg" :src="getIMG_URL+film.backdrop_path">
            <div class="favorite-film-card"
                 role="button"
            >
                <div class="favorite-film-card__image">
                    <img :src="getIMG_URL+film.poster_path">
                </div>
                <div class="favorite-film-card__info">
                    <div class="favorite-film-card__title">
                        {{ film.title }} ({{ new Date( film.release_date ).getFullYear() }})
                        <div class="favorite-film-card__info-film">
                            <div class="favorite-film-card__date">
                                {{ film.release_date }}
                            </div>
                            <div class="favorite-film-card__genres">
                           <span
                                   v-for="genre in film.genres"
                                   :key="genre.id"
                           >
                               {{ genre.name }}
                           </span>
                            </div>
                        </div>
                    </div>

                    <div class="favorite-film-card__description">
                        {{ film.overview }}
                    </div>
                    <div class="favorite-film-card__actions">
                        <b-button variant="light"
                                  type="button"
                                  class="btn-sm"
                                  title="Like this film"
                                  :disabled="like"
                                  @click.stop="likesFilm(film)"
                        >
                            <img src="../assets/like_favorite_heart_5759.png" />
                        </b-button>
                        <p style="cursor: pointer" @click="showVideo">
                            <b-icon icon="play" aria-hidden="true"></b-icon>
                            trailer
                        </p>
                        <p style="cursor: pointer" @click="showRecomend">similar films</p>
                    </div>

                </div>
            </div>
        </div>
        <div class="slider-card container">
            <actors-slider :actor-list="actors"
                           @toActor="toActor"
            />
        </div>
        <div class="table" v-if="similar">
            <recomend-table :recomend-film-list="recomendFilmList" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import BackButton from '@/components/_partial/BackButton'
import RecomendTable from '@/components/RecomendTable'
import ActorsSlider from '@/components/slider/ActorsSlider'

import { getVideo, getInfoFilm, getSimilarFilmList } from '@/services/film.service'


export default {
    name: 'FilmItem',
    components: {
        RecomendTable,
        ActorsSlider,
        BackButton
    },
    data() {
        return {
            like: false,
            loading: true,
            similar: false,
            film: {},
            recomendFilmList: []
        }
    },
    computed: {
        ...mapGetters( [
            'getIMG_URL',
            'getFilm'
        ] ),
        actors() {
            return _.get( this.film, 'credits.cast', [] )
        }
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
        showRecomend() {
            this.similar = true
            getSimilarFilmList( this.$route.params.id )
                .then( ( response ) => {
                    this.recomendFilmList = response
                } )
        },
        showVideo() {
            getVideo( this.$route.params.id )
                .then( ( video ) => {
                    this.$popup.video( video.key )
                } )
        }
    },
    watch: {
        '$route.params.id': {
            handler: function() {
                this.fetchFilmInfo()
                if( this.similar ) {
                    this.similar = false
                    this.recomendFilmList = []
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style scoped lang="scss">

.wrapper-card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &__bg {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    object-fit: cover;
    opacity: 0.1;
    z-index: 0;
  }
}

.favorite-film-card {
  display: flex;
  color: black;
  max-width: 1300px;
  z-index: 10;

  &__image {
    margin-right: 10px;
    width: 300px;
    height: 450px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-size: 32px;
  }

  &__info-film {
    display: flex;

  }

  &__date {
    margin-right: 10px;
  }

  &__description {
    padding-top: 50px;
  }

  &__info {
    position: relative;
  }

  &__actions {
    display: flex;
    width: 100%;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
  }
}

.card {
  margin: 5rem;
  height: 100%;
}

.genres h4 {
  font-size: 18px;
  margin-top: 10px;
}

.about h4 {
  font-size: 20px;
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
  color: black;
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

@media (max-width: 1024px) {

}
</style>