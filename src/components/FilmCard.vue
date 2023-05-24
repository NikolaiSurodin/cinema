<template>
  <router-link
      class="film-card"
      :to="`/films/${ film.id }`"
  >
    <div class="film-card__img">
      <img src="@/assets/no_photo.png" v-if="film.poster_path === null" alt="photo">
      <img :src="getIMG_URL+film.poster_path" alt="photo" v-else>
    </div>
    <div class="film-card__like-button">
      <button
          class="button button-like"
          @click.prevent="likesFilm( film )"
      >
        Like!
      </button>
    </div>
    <div
        class="film-card__rating"
        v-if="film.vote_average > 0"
        :style="{ 'background': ratingColor }"
    >
      {{ film.vote_average }}
    </div>
    <div class="film-card__info">
      <div class="film-card__title">
        {{ film.title }}
      </div>
      <div class="film-card__overview">
        {{ film.overview || 'No overview' }}
      </div>
      <hr>
      <div class="film-card__footer" v-if="film.release_date">
        ({{ new Date( _.get( film, 'release_date', '' ) ).getFullYear() || '' }})
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import rating from '@/const/rating'

export default {
  name: 'FilmCard',
  data() {
    return {}
  },
  props: {
    film: Object
  },
  methods: {
    ...mapActions( [ 'addLikeFilm' ] ),

    likesFilm( film ) {
      if ( !this.getIsLoggedIn ) {
        this.$popup.toast( 'Please, You must be logged into your account', 'error' )
      } else {
        this.addLikeFilm( film )
            .then( () => {
              this.$popup.toast( 'this movie was added to the "Like" list' )
            } )
      }
    }
  },
  computed: {
    ...mapGetters( [ 'getIMG_URL', 'getIsLoggedIn' ] ),

    ratingColor() {
      let color = rating.GOOD_RATING.color

      if ( this.film.vote_average < rating.GOOD_RATING.value ) {
        color = rating.BAD_RATING.color
      } else if ( this.film.vote_average >= rating.GREAT_RATING.value ) {
        color = rating.GREAT_RATING.color
      }
      return color
    }
  }
}
</script>

<style scoped lang="scss">

.film-card {
  cursor: pointer;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  color: black;
  position: relative;
  min-height: 250px;

  &:hover {
    .film-card__like-button {
      opacity: 1;
    }
  }

  &__like-button {
    opacity: 0;
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #fff;
    transition: opacity .3s;
  }

  &__rating {
    display: inline-block;
    position: absolute;
    left: 1rem;
    top: 1rem;
    padding: 1px 5px;
    border-radius: 2px;
  }

  &__overview {
    word-break: break-word;
    display: block;
    height: 94px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__img {
    border-radius: 5px;

    img {
      border-radius: 5px;
      transition: all 0.2s;

      &:hover {
        transform: scale(1.03, 1.014);
      }
    }
  }
  &__title {
    display: flex;
    justify-content: center;
    padding-top: 5px;
    font-size: 20px;
    font-weight: 400;
  }

  &__overview {
    font-size: 16px;
    font-weight: 300;
  }

  &__footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
}

</style>