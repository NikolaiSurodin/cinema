import {
    globalFilm,
    recomendFilmList,
    infoFilm,
    filmList,
    getNewFilms,
    getPopularFilmList
} from "@/services/film.service"

export default {
    fetchFilmList( { commit } ) {
        return new Promise( ( resolve, reject ) => {
            filmList().then( ( films ) => {
                commit( 'SET_FILM_LIST', films )
            } )
            resolve()
            reject()
        } )
    },
    fetchOnPageFilms( { commit }, page ) {
        return new Promise( resolve => {
            getNewFilms( page )
                .then( ( filmList ) => {
                    commit( 'PUSH', filmList )
                    resolve()
                } )
        } )
    },
    fetchInfoDetailFilm( { commit }, id ) {
        return new Promise( resolve => {
            infoFilm( id )
                .then( ( film ) => {
                    commit( 'SET_FILM_INFO', film )
                } )
            resolve()
        } )
    },
    clearFIlmItem( { commit } ) {
        return new Promise( resolve => {
            commit( 'CLEAR' )
            resolve()
        } )
    },
    globalSearchFilm( { commit }, searchValue ) {
        return new Promise( resolve => {
            globalFilm( searchValue )
                .then( ( film ) => {
                    commit( 'SET_GLOBAL_FILM', film )
                } )
            resolve()
        } )

    },
    removeGlobalFilm( { commit } ) {
        commit( 'REMOVE_GLOBAL_FILM' )
    },
    addLikeFilm( {  commit }, film ) {
        return new Promise( ( resolve ) => {
            resolve()
            commit( 'SET_LIKE_FILM', film )
            resolve()
        } )
    },
    removeLikeFilm( { commit }, film ) {
        return new Promise( resolve => {
            commit( 'DELETE_LIKE_FILM', film )
            resolve()
        } )
    },
    fetchRecomendFilms( { commit }, id ) {
        return new Promise( resolve => {
            recomendFilmList( id )
                .then( ( films ) => {
                    commit( 'SET_RECOMEND', films )
                } )
            resolve()
        } )

    },
    removeRecomendFilmList( { commit } ) {
        return new Promise( resolve => {
            commit( 'CLEAR_RECOMEND_LIST' )
            resolve()
        } )
    },
    fetchPopularFilmList( { commit }, page ) {
        return new Promise( resolve => {
            getPopularFilmList( page )
                .then( ( films ) => {
                    commit( 'SET_POPULAR_FILM_LIST', films )
                } )
            resolve()
        } )
    }
}