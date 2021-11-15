import axios from "axios"
import { endpoints } from "@/endpoints"

const BASE = `https://api.themoviedb.org/3`
const API_KEY = 'a1a84ce3dd10a1eb326873af2b7d9e60'

export const globalFilm = ( searchValue ) => {
    return new Promise( resolve => {
        let global = []
        axios
            .get( `${ BASE }${ endpoints.films.getSearchFilm }`.replace( '{:search}', searchValue ).replace( '{:api_key}', API_KEY ) )
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
            .get( `${ BASE }${ endpoints.films.getRecommendationsFilmList }`.replace( '{movie_id}', id ).replace( '{:api_key}', API_KEY ) )
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
            .get( `${ BASE }${ endpoints.films.getMovie }`.replace( '{movie_id}', id ).replace( '{:api_key}', API_KEY ) )
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
            .get( `${ BASE }${ endpoints.films.getFilmList }`.replace( '{:api_key}', API_KEY ) )
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
        let addedFilms = [] // добавленные новые фильмы
        axios
            .get( `${ BASE }${ endpoints.films.getFilmList }`.replace( '{:api_key}', API_KEY ).replace( 'page=1', `page=${ page }` ) )
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
            .get( `${ BASE }${ endpoints.films.getPopularFilmList }`.replace( 'numberPage', page ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const getSimilarFilmList = ( id ) => {
    return new Promise( resolve => {
        let films = []
        axios
            .get( `${ BASE }${ endpoints.films.getSimilarList }`.replace( '{movie_id}', id ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const getVideo = ( id ) => {
    return new Promise( resolve => {
        axios.get( `${ BASE }${ endpoints.films.getTrailer }`.replace( '{movie_id}', id ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                resolve( response.data.results[ 0 ] )
            } )
    } )
}


