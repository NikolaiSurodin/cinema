<template>
    <div class="main-page">
        <div class="main-page__header">
            <div class="main-page__content" style="color: white">
                <div class="main-page__title">
                    Welcome.
                </div>
                <div class="main-page__description">
                    Millions of movies, TV shows and people to discover. Explore now.
                </div>
                <div class="main-page__input">
                    <custom-input
                            v-model="search"
                            :is-scale="true"
                            placeholder="search for movie"
                    />
                    <b-button v-if="search" @click="searchFilm">Search</b-button>
                </div>
            </div>
        </div>

        <div class="main-page__filters">
        </div>

        <div class="main-page__film-list">
            <filter-side-bar />
            <template v-if="loading">
                <b-spinner class="main-layout-spinner" type="grow"></b-spinner>
            </template>
            <film-table
                    v-else
                    :film-list="films"
                    @loadData="loadData"
            />
        </div>

    </div>
</template>

<script>
import CustomInput from '@/components/_partial/CustomInput'
import FilmTable from '@/components/FilmTable'

import { mapActions, mapGetters, mapState } from 'vuex'

import { filmList } from '@/services/film.service'
import FilterSideBar from '@/components/FilterSideBar'

export default {
    name: 'MainLayout',
    components: {
        CustomInput,
        FilmTable,
        FilterSideBar
    },
    data() {
        return {
            search: '',
            globalFilm: {},
            activeFilmId: '',
            loading: true,
            currentPage: 1,
            global: false,
            films: []
        }
    },
    mounted() {
        this.fetchFilmList()
    },
    methods: {
        ...mapActions(
            [
                'fetchFilmList',
                'fetchOnPageFilms',
                'globalSearchFilm',
                'removeGlobalFilm',
                'fetchListByGenre',
                'clearFilmListByGenre',
                'clearGenderFilter'
            ] ),

        fetchFilmList() {
            filmList(
                this.getPayloadFilter
            )
                .then( ( result ) => {
                    this.films = result
                    this.loading = false
                } )
        },
        toFilm( id ) {
            this.$router.push( `/films/${ id }` )
        },
        searchFilm() {
            if( this.search ) {
                this.$router.push( { path: '/search', query: { search: this.search } } )
            }
        },
        loadData() {
            this.currentPage++

            filmList( {
                with_genres: this.activeFilmId,
                page: this.currentPage
            } )
                .then( ( result ) => {
                    this.films = [ ...this.films, ...result ]
                    this.loading = false
                } )
        }
    },
    computed: {
        ...mapGetters(
            [
                'getFilmList',
                'getGlobalFilm',
                'getUser',
                'getFilmsByGenre',
                'getGenresList',
                'getPayloadFilter'
            ] ),
        ...mapState( [ 'user' ] )
    },
    watch: {
        getPayloadFilter() {
            this.fetchFilmList()
        }
    }
}
</script>

<style lang="scss">

.main-page {
  &__film-list {
    display: flex;
  }

  &__header {
    min-height: 350px;
    background-image: linear-gradient(to right, rgba(27, 68, 101, 0.8) 0%, rgba(93, 84, 84, 0) 100%), url('.././assets/images/main-title-image.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    display: flex;
    margin: 0 auto;
    width: 100%;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 15px;
  }

  &__title {
    font-size: 3em;
    font-weight: 700;
    line-height: 1;
  }

  &__description {
    font-size: 2em;
    font-weight: 600;
    margin: 0;
  }

  &__input {
    display: flex;
    justify-content: center;
  }

}
</style>
