import { endpoints } from '@/endpoints'
import { instance } from '@/helpers/http.helper'

export const searchFilm = ( searchValue, page ) => {
    return new Promise( resolve => {
        let global = []
        instance.get( endpoints.films.getSearchFilm, {
            params: {
                query: searchValue,
                page: page
            }
        } )

            .then( response => {
                global = response.data.results
                resolve( global )
            } )
    } )
}
export const recomendFilmList = ( id ) => {
    return new Promise( resolve => {
        let films = []
        instance.get( endpoints.films.getRecommendationsFilmList.replace( '{movie_id}', id ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const getInfoFilm = ( id, params ) => {
    return new Promise( resolve => {
        let film = {}
        instance.get( endpoints.films.getMovie.replace( '{movie_id}', id ), { params } )
            .then( response => {
                film = response.data
                resolve( film )
            } )
    } )
}

export const filmList = ( params ) => {
    return new Promise( ( resolve, reject ) => {

        instance.get( endpoints.films.getFilmList, {
            params
        } )
            .then( response => {
                resolve( response.data.results )
            } )
            .catch( () => {
                reject()
            } )
    } )
}


export const getNewFilms = ( page ) => {
    return new Promise( resolve => {
        let addedFilms = [] // добавленные новые фильмы
        instance.get( endpoints.films.getFilmList.replace( 'page=1', `page=${ page }` ) )
            .then( response => {
                addedFilms = response.data.results
                resolve( addedFilms )
            } )
    } )
}
export const getPopularFilmList = ( page ) => {
    return new Promise( resolve => {
        let films = []
        instance.get( endpoints.films.getPopularFilmList.replace( 'page=1', `page=${ page }` ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const getSimilarFilmList = ( id ) => {
    return new Promise( resolve => {
        let films = []
        instance.get( endpoints.films.getSimilarList.replace( '{movie_id}', id ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
    } )
}
export const getVideo = ( id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.films.getTrailer.replace( '{movie_id}', id ) )
            .then( response => {
                resolve( response.data.results )
            } )
    } )
}
export const getGenres = () => {
    return new Promise( resolve => {
        instance.get( endpoints.genres.getGenres )
            .then( response => {
                resolve( response.data.genres )
            } )
    } )
}
export const getFilmListByGenre = ( genres, page ) => {
    return new Promise( resolve => {
        instance.get( endpoints.films.getListByGenre.replace( 'page=1', `page=${ page }` ).replace( '{genres}', genres ) )
            .then( response => {
                resolve( response.data.results )
            } )
    } )
}
export const markFavorite = ( film, account_id, session_id ) => {
    return new Promise( resolve => {
        instance.post( endpoints.films.likeFilm.replace( '{:account_id}', account_id ).replace( '{:session_id}', session_id ), film )
            .then( () => {
                resolve()
            } )
    } )
}
export const favoriteFilmList = ( account_id, session_id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.films.getFavoriteFilmList.replace( '{:account_id}', account_id ).replace( '{:session_id}', session_id ) )
            .then( response => {
                resolve( response.data.results )
            } )
    } )
}



