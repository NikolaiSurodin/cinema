<template>
    <div class="wrapper">
        <div class="layout">
            <film-card
                    v-for="film in filmList"
                    :key="film.id"
                    :film="film"
                    @clickOnFilm="toFilm(film.id)"
            />

        </div>
        <b-button @click="loadingFilmList">Loading</b-button>
    </div>

</template>

<script>
import FilmCard from '@/components/FilmCard'
import { getInfoFilm } from '@/services/film.service'

export default {
    name: 'FilmTable',
    components: { FilmCard },
    data() {
        return {}
    },
    props: {
        filmList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        toFilm( id ) {
            this.$router.push( `/films/${ id }` )
            getInfoFilm( this.$route.params.id )
        },
        loadingFilmList() {
            this.$emit( 'loadData' )
        }
    }
}
</script>

<style scoped>

</style>