import { endpoints } from "@/endpoints"
import { instance, API_KEY } from "@/helpers/http.helper"

export const globalFilm = ( searchValue ) => {
    return new Promise( resolve => {
        let global = []
        instance.get( endpoints.films.getSearchFilm.replace( '{:search}', searchValue ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                global = response.data.results
                resolve( global )
            } )
    } )
}
export const recomendFilmList = ( id ) => {
    return new Promise( resolve => {
        let films = []
        instance.get( endpoints.films.getRecommendationsFilmList.replace( '{movie_id}', id ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const infoFilm = ( id ) => {
    return new Promise( resolve => {
        let film = {}
        instance.get( endpoints.films.getMovie.replace( '{movie_id}', id ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                film = response.data
                resolve( film )
            } )
    } )
}
export const filmList = () => {
    return new Promise( ( resolve, reject ) => {
        let films = []
        instance.get( endpoints.films.getFilmList.replace( '{:api_key}', API_KEY ) )
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
        instance.get( endpoints.films.getFilmList.replace( '{:api_key}', API_KEY ).replace( 'page=1', `page=${ page }` ) )
            .then( response => {
                addedFilms = response.data.results
                resolve( addedFilms )
            } )
    } )
}
export const getPopularFilmList = ( page ) => {
    return new Promise( resolve => {
        let films = []
        instance.get( endpoints.films.getPopularFilmList.replace( 'page=1', `page=${ page }` ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const getSimilarFilmList = ( id ) => {
    return new Promise( resolve => {
        let films = []
        instance.get( endpoints.films.getSimilarList.replace( '{movie_id}', id ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const getVideo = ( id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.films.getTrailer.replace( '{movie_id}', id ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                resolve( response.data.results[ 0 ] )
            } )
    } )
}
export const getGenres = () => {
    return new Promise( resolve => {
        instance.get( endpoints.genres.getGenres.replace( '{:api_key}', API_KEY ) )
            .then( response => {
                resolve( response.data.genres )
            } )
    } )
}
export const getFilmListByGenre = ( genres, page ) => {
    return new Promise( resolve => {
        instance.get( endpoints.films.getListByGenre.replace( 'page=1', `page=${ page }` ).replace( '{:api_key}', API_KEY ).replace( '{genres}', genres ) )
            .then( response => {
                resolve( response.data.results )
            } )
    } )
}
export const markFavorite = ( film, account_id, session_id ) => {
    return new Promise( resolve => {
        instance.post( endpoints.films.likeFilm.replace( '{:account_id}', account_id ).replace( '{:session_id}', session_id ).replace( '{:api_key}', API_KEY ), film )
            .then( () => {
                resolve()
            } )
    } )
}
export const favoriteFilmList = ( account_id, session_id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.films.getFavoriteFilmList.replace( '{:account_id}', account_id ).replace( '{:api_key}', API_KEY ).replace( '{:session_id}', session_id ) )
            .then( response => {
                resolve( response.data.results )
            } )
    } )
}



