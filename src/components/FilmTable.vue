<template>
        <div class="film-list">
            <film-card
                    v-for="film in filmList"
                    :key="film.id"
                    :film="film"
                    @clickOnFilm="toFilm(film.id)"
            />
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

<style lang="scss">

.film-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  column-gap: 30px;
  row-gap: 50px;
  padding: 16px;
}

</style>