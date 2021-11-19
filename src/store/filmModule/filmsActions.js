import {
    globalFilm,
    recomendFilmList,
    infoFilm,
    filmList,
    getNewFilms,
    getPopularFilmList,
    getSimilarFilmList,
    getGenres,
    getFilmListByGenre
} from "@/services/film.service"

export default {
    fetchFilmList( { commit } ) {
        return new Promise( ( resolve, reject ) => {
            filmList()
                .then( ( films ) => {
                    commit( 'SET_FILM_LIST', films )
                    resolve()
                } )
                .catch( () => {
                    reject()
                } )
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
        return new Promise( ( resolve, reject ) => {
            infoFilm( id )
                .then( ( film ) => {
                    commit( 'SET_FILM_INFO', film )
                    resolve()
                } )
                .catch( () => {
                    reject()
                } )

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
    addLikeFilm( { commit, state }, film ) {
        return new Promise( ( resolve, reject ) => {
            const found = state.likesFilmList.some( el => el.id === film.id )
            if ( !found ) {
                resolve( commit( 'SET_LIKE_FILM', film ) )
            }
            reject()
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
    fetchSimilarFilms( { commit }, id ) {
        return new Promise( resolve => {
            getSimilarFilmList( id )
                .then( ( films ) => {
                    commit( 'SET_SIMILAR_FILM_LIST', films )
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
    },
    fetchGenres( { commit } ) {
        return new Promise( resolve => {
            getGenres().then( ( genres ) => {
                commit( 'SET_GENRES_LIST', genres )
                resolve()
            } )
        } )
    },
    clearGenresList( { commit } ) {
        commit( 'REMOVE_GENRES_LIST' )
    },
    selectedGenre( { commit }, genre ) {
        commit( 'SET_ACTIVE_GENRE', genre )
    },
    fetchListByGenre( { commit }, { genres, page  } ) {
        return new Promise( resolve => {
            getFilmListByGenre( genres, page )
                .then( ( films ) => {
                    commit( 'SET_FILMS_BY_GENRE', films )
                    resolve()
                } )
        } )

    }
}