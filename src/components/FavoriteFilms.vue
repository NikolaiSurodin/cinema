<template>
    <div class="favorite-films container">
        <div class="favorite-films__title">
            <span>My Favorites</span>
            <span class="favorite-films__type">Movies {{ getFavoriteFilms.length }}</span>
        </div>
        <div class="favorite-films__list"
             :class="{'table-like':getFavoriteFilms.length < 3 }">
            <div v-for="film in getFavoriteFilms" :key="film.id">
                <FavoriteFilmCard
                        :film="film"
                        @clickOnFilm="toFilm(film.id)"
                        @deleteLikeFilm="removeLikeFilms(film)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FavoriteFilmCard from '@/components/FavoriteFilmCard'

export default {
    name: 'FavoriteFilms',
    components: { FavoriteFilmCard },
    methods: {
        ...mapActions( [ 'fetchFavoriteFilmList', 'deleteLikeFilm' ] ),
        removeLikeFilms( f ) {
            this.deleteLikeFilm( f )
                .then( () => {
                    if( !this.getFavoriteFilms.length ) {
                        this.$popup.success( 'You have not favorite films', 'OK!' )
                            .then( () => this.$router.push( '/films' ) )
                    }
                } )
        },
        toFilm( id ) {
            this.$router.push( `/films/${ id }` )
        }
    },
    computed: {
        ...mapGetters( [ 'getFavoriteFilms' ] ),
        films() {
            return this.getFavoriteFilms
        }
    },
    created() {
        this.fetchFavoriteFilmList()
    }
}
</script>

<style scoped lang="scss">

.favorite-films {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  &__title {
    color: black;
  }
}

.table-like {
  /*grid-template-columns: 1fr 1fr 1fr;*/
  /*grid-template-columns: minmax(200px, 300px) minmax(200px, 300px) minmax(200px, 300px);*/
}

@media (max-width: 450px) {
  .table-like {
    /*grid-template-columns: minmax(200px,300px);*/
    /*grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));*/

  }
}
</style>