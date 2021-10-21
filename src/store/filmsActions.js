import axios from "axios"
import { endpoints } from "@/endpoints"

const API_KEY = 'a1a84ce3dd10a1eb326873af2b7d9e60'
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${ API_KEY }`
const MOVIE_URL = `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${ API_KEY }&language=en-US`
const GLOBAL_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=a1a84ce3dd10a1eb326873af2b7d9e60&language=ru-RU&query={:search}&page=1&include_adult=false`

export default {
    fetchFilmList( { commit } ) {
        return new Promise( ( resolve, reject )=> {
            let films = []
            axios
                .get( `${ BASE_URL }&${ endpoints.films.get }` )
                .then( response => {
                    films = response.data.results
                    commit( 'SET_FILM_LIST', films )
                    resolve()
                } )
                .catch(() => {reject()})

        } )
    },
    fetchOnPageFilms( { commit }, page ) {
        return new Promise( resolve => {
            let arr = []
            axios
                .get( `${ BASE_URL }&${ endpoints.films.get }`.replace( 'page=1', `page=${ page }` ) )
                .then( response => {
                    arr = response.data.results
                    commit( 'PUSH', arr )
                    resolve()
                } )
        } )
    },
    fetchInfoDetailFilm( { commit }, id ) {
        return new Promise( resolve => {
            let film = {}
            axios
                .get( `${ MOVIE_URL }`.replace( '{movie_id}', id ) )
                .then( response => {
                    film = response.data
                    commit( 'SET_FILM_INFO', film )
                    resolve()
                } )
        } )
    },
    clearFIlmItem({commit}){
        commit('CLEAR')
    },
    globalSearchFilm({commit}, searchValue){
        return new Promise(resolve => {
            let globalSearchFilm = {}
            axios
                .get( `${ GLOBAL_SEARCH_URL }`.replace( '{:search}', searchValue ) )
                .then( response => {
                    globalSearchFilm = response.data.results
                    commit( 'SET_GLOBAL_FILM', globalSearchFilm )
                    resolve()
                } )
        })
    },
    removeGlobalFilm({commit}){
        commit('REMOVE_GLOBAL_FILM')
    }
}