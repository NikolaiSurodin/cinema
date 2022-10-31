<template>
    <div class="wrapper">
        <main class="main">
            <custom-input v-model="search"
                          @input="searchFilm"
            />
            <div class="pop d-flex justify-content-center flex-wrap">
                <b-button class="mt-2" style="background: unset">What`s popular films?</b-button>
                <b-button class="mt-2" style="background: unset">Popular people.</b-button>
            </div>
            <template>
                <div class="welcome-text">
                    <div class="text-title">
                        <p>Welcome <span>, {{ user }}</span></p>
                    </div>
                    <p>Millions of movies, TV shows and people. Explore now.</p>
                </div>
            </template>
            <template>
                <genres-list
                        @remove="removeFilterFilmList"
                />
            </template>
            <template v-if="loading">
                <b-spinner class="main-layout-spinner" type="grow"></b-spinner>
            </template>
            <div v-else ref="films">
                <film-table :film-list="films"
                            @loadData="loadData"
                />
            </div>
        </main>
    </div>
</template>

<script>
import FilmCard from '@/components/FilmCard'
import ButtonToUp from '@/components/ButtonToUp'
import GenresList from '@/components/GenresList'
import Pagination from '@/components/Pagination'
import CustomInput from '@/components/_partial/CustomInput'
import FilmTable from '@/components/FilmTable'
import { mapActions, mapGetters, mapState } from 'vuex'
import { filmList, searchFilm } from '@/services/film.service'

export default {
    name: 'MainLayout',
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
    components: {
        CustomInput,
        FilmCard,
        ButtonToUp,
        GenresList,
        Pagination,
        FilmTable
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
            filmList( {
                with_genres: this.activeFilmId,
                page: this.currentPage
            } )
                .then( ( result ) => {
                    this.films = result
                    this.loading = false
                } )
        },
        toFilm( id ) {
            this.$router.push( `/films/${ id }` )
        },
        removeFilterFilmList() {
            this.activeFilmId = ''
            this.clearGenderFilter()
        },
        searchFilm() {
            if( this.search ) {
                this.films = []
                searchFilm( this.search ).then( ( res ) => {
                    this.films = res
                } )
            } else {
                this.fetchFilmList()
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
                'getGenresList'
            ] ),
        ...mapState( [ 'user' ] ),

        selectFilterByGenges() {
            return this.getGenresList.filter( el => el.isActive ).map( ( el ) => ( { id: el.id } ) )
        }
    },
    watch: {
        selectFilterByGenges() {
            let genresId = []
            this.selectFilterByGenges.forEach( el => genresId.push( el.id ) )
            this.activeFilmId = genresId.toString()
            this.fetchFilmList()
        }
    }
}
</script>

<style scoped>

.main {
    flex: 1 1 auto;
}

.welcome-text {
    margin-left: 4em;
    display: block;
    border-left: 1px solid;
}

.text-title p {
    font-size: 44px;
    font-family: fantasy;
    line-height: 2;
    letter-spacing: 8px;
}

p {
    font-size: 20px;
    font-family: sans-serif;
}
</style>
