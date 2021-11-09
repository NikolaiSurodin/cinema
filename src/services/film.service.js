import axios from "axios"
import { endpoints } from "@/endpoints";

const GLOBAL_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=a1a84ce3dd10a1eb326873af2b7d9e60&language=ru-RU&query={:search}&page=1&include_adult=false`
const API_KEY = 'a1a84ce3dd10a1eb326873af2b7d9e60'
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${ API_KEY }`
const MOVIE_URL = `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${ API_KEY }&language=en-US`
const RECOMEND_URL = `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=${ API_KEY }&language=en-US&page=1`
const POPULAR_FILMS_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${ API_KEY }&language=en-US&page=numberPage`
export const globalFilm = ( searchValue ) => {
    return new Promise( resolve => {
        let global = []
        axios
            .get( `${ GLOBAL_SEARCH_URL }`.replace( '{:search}', searchValue ) )
            .then( response => {
                global = response.data.results
                resolve( global )
            } )
    } )
}
export const recomendFilmList = ( id ) => {
    return new Promise( resolve => {
        let films = []
        axios
            .get( `${ RECOMEND_URL }`.replace( '{movie_id}', id ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const infoFilm = ( id ) => {
    return new Promise( resolve => {
        let film = {}
        axios
            .get( `${ MOVIE_URL }`.replace( '{movie_id}', id ) )
            .then( response => {
                film = response.data
                resolve( film )
            } )
    } )
}
export const filmList = () => {
    return new Promise( ( resolve, reject ) => {
        let films = []
        axios
            .get( `${ BASE_URL }&${ endpoints.films.get }` )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
            .catch( () => {
                reject()
            } )

    } )
}
export const getNewFilms = ( page ) => {
    return new Promise( resolve => {
        let addedFilms = [] // добавленный новые фильмы
        axios
            .get( `${ BASE_URL }&${ endpoints.films.get }`.replace( 'page=1', `page=${ page }` ) )
            .then( response => {
                addedFilms = response.data.results
                resolve( addedFilms )
            } )
    } )
}
export const getPopularFilmList = ( page ) => {
    return new Promise( resolve => {
        let films = []
        axios
            .get( `${ POPULAR_FILMS_URL }`.replace( 'numberPage', page ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const getVideo = (id) => {
    return new Promise(resolve =>  {
        axios.get( `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                resolve(response.data.results[0])
            })
    })
}


