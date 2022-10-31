<template>
    <div class="favorite-film-card"  role="button" @click="$emit( 'clickOnFilm' )">
        <div class="favorite-film-card__image">
            <img :src="getIMG_URL+film.poster_path">
        </div>
        <div class="favorite-film-card__info">
            <div class="favorite-film-card__title">
                {{ film.title }}
                <div class="favorite-film-card__date">
                    {{ film.release_date }}
                </div>
            </div>

            <div class="favorite-film-card__description">
                {{ filmOverview }}
            </div>
            <div class="favorite-film-card__actions">
                <div class="favorite-film-card__action-button">
                    <div class="favorite-film-card__circle favorite-film-card__circle--like">

                    </div>
                    Favorite
                </div>
                <div class="favorite-film-card__action-button" @click.stop="$emit( 'deleteLikeFilm' )">
                    <div class="favorite-film-card__circle favorite-film-card__circle--remove">
                        X
                    </div>
                    Remove
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'FavoriteFilmCard',
    props: {
        film: Object
    },
    computed: {
        ...mapGetters( [ 'getIMG_URL' ] ),
        filmOverview() {
            return _.get( this.film, 'overview', 'No overview' )
        },
    }
}
</script>

<style scoped lang="scss">

.favorite-film-card {
  display: flex;
  border-radius: 8px;
  border: 1px solid gray;
  color: black;
  box-shadow: 0 2px 8px;


  &__image {
    margin-right: 10px;
    img {
      width: calc(200px / 1.5);
      min-width: calc(200px / 1.5);
      height: 200px;
      display: block;
    }
  }

  &__title {
    font-size: 24px;
  }

  &__date {
    color: #999;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__actions {
    display: flex;
    width: 50%;
  }

  &__action-button {
    cursor: pointer;
    color: #999;
    padding-left: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    &--like {
      background-color: #ef47b6;
      border: 1px solid #ef47b6;
    }

    &--remove {
      background-color: transparent;
      border: 1px solid #999;
      &:hover {
        background-color: #737373;
      }
    }

  }
}

</style>