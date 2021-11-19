<template>
  <!--  <b-card :title="film.title"-->
  <!--          :img-src="getIMG_URL+film.poster_path"-->
  <!--          img-alt="Image" img-top-->
  <!--          class="card"-->
  <!--          @click="toFilm()"-->
  <!--  >-->
  <!--    <b-card-text class="text" style="color: black">-->
  <!--      {{ filmOverview }}-->
  <!--    </b-card-text>-->
  <!--    <div class="bt-close" v-if="isRouteLike">-->
  <!--      <b-button variant="light"-->
  <!--                type="button"-->
  <!--                class="btn-sm"-->
  <!--                title="Delete this film"-->
  <!--                @click.stop="deleteLikeFilm"-->
  <!--      >-->
  <!--        <b-icon icon="x-circle" scale="1" style="cursor: pointer;"></b-icon>-->
  <!--      </b-button>-->
  <!--    </div>-->
  <!--    <template #footer>-->
  <!--      <small class="text-muted">-->
  <!--        <p class="rating">-->
  <!--          <b-icon icon="star-fill" class="rating-icon"></b-icon>-->
  <!--          {{ film.vote_average }} ({{ new Date( film.release_date ).getFullYear() }})-->
  <!--        </p>-->
  <!--      </small>-->
  <!--    </template>-->
  <!--  </b-card>-->
  <div class="card card-film img-responsive" @click.stop="toFilm()">
    <div class="card-film__img">
      <img :src="getIMG_URL+film.poster_path">
      <button v-if="!isRouteLike" class="like-button" @click.stop="likesFilm(film)">Like!</button>
    </div>
    <div class="card-body-custom">
      <div class="card-film__title">
        {{ film.title }}
      </div>
      <div class="card-film__overview">
        {{ filmOverview }}
      </div>
      <hr>
      <div class="card-film__footer">
        <b-icon icon="star-fill" class="rating-icon"></b-icon>
        {{ film.vote_average }} ({{ new Date( film.release_date ).getFullYear() }})
        <span>
              <b-button v-if="isRouteLike"
                        variant="light"
                        type="button"
                        class="btn-sm"
                        title="Delete this film"
                        @click.stop="deleteLikeFilm"
              >
                <b-icon icon="x-circle" scale="1" style="cursor: pointer;"></b-icon>
              </b-button>
      </span>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "FilmCard",
  data() {
    return {}
  },
  props: {
    film: Object
  },
  methods: {
    ...mapActions(['addLikeFilm']),
    toFilm() {
      this.$emit( 'clickOnFilm' )
    },
    deleteLikeFilm() {
      this.$emit( 'deleteLikeFilm' )
    },
    likesFilm( film ) {
      this.addLikeFilm( film )
          .then( () => {
            this.like = true
            //this.$popup.success( 'this movie was added to the "Like" list', 'Like!' )
            this.$popup.toast('this movie was added to the "Like" list')
          } )
          .catch( () => {
            this.$popup.error( 'This film in you favorite list already' )
          } )
    }
  },
  computed: {
    ...mapGetters( [ 'getIMG_URL' ] ),
    filmOverview() {
      return this.film.overview !== '' ? this.film.overview : 'Overview no'
    },
    isRouteLike() {
      return !!this.$route.path.includes( 'likeFilms' )
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
  box-shadow: 1px 1px 1px white;
  transition: 1s;
  display: flex;
  width: 100%;
}

.card :hover {
  filter: grayscale(0);
}

.card-film__footer {
  text-align: end;
  color: black;
}

.rating-icon {
  color: burlywood;
}

.card h4 {
  color: darkcyan;
}

.card-film__overview {
  color: black;
  word-break: break-word;
  display: block;
  height: 94px;
  text-overflow: ellipsis;
  /* width: 370px; */
  /* white-space: nowrap; */
  overflow: hidden;
}

.bt-close {
  display: flex;
  justify-content: end;
}

.img-responsive {
  position: relative;
}

.like-button {
  opacity: 0;
  position: absolute;
  width: 200px;
  height: 40px;
  top: 100px;
  background: rgba(0, 0, 0, .3);
  left: calc(50% - 100px);
  color: #fff;
  transition: opacity .3s;
}

.img-responsive:hover button {
  opacity: 1;
  transition: opacity .3s;
}

.card-film__img img {
  max-width: 100%;
}
</style>