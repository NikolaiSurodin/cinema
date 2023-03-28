import {
    globalFilm,
    recomendFilmList,
    infoFilm,
    filmList,
    getNewFilms,
    getPopularFilmList,
    getSimilarFilmList,
    getGenres,
    getFilmListByGenre,
    markFavorite,
    favoriteFilmList
} from '@/services/film.service'

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
    addLikeFilm( { getters }, film ) {
        return new Promise( ( resolve ) => {
            markFavorite( {
                    media_type: 'movie',
                    media_id: film.id,
                    favorite: true
                },
                getters.getUser.username,
                getters.getSession_id )
            resolve()
        } )
    },
    deleteLikeFilm( { commit, getters }, film ) {
        return new Promise( ( resolve ) => {
            markFavorite( {
                    media_type: 'movie',
                    media_id: film.id,
                    favorite: false
                },
                getters.getUser.username,
                getters.getSession_id )
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
    removeActiveGenreList( { commit } ) {
        commit( 'CLEAR_ACTIVE_GENRE_LIST' )
    },
    fetchListByGenre( { commit }, { genres, page } ) {
        return new Promise( resolve => {
            getFilmListByGenre( genres, page )
                .then( ( films ) => {
                    commit( 'SET_FILMS_BY_GENRE', films )
                    resolve()
                } )
        } )
    },
    clearFilmListByGenre( { commit } ) {
        return new Promise( resolve => {
            commit( 'REMOVE_FILM_LIST_BY_GENRE' )
            resolve()
        } )
    },
    fetchFavoriteFilmList( { commit, getters } ) {
        favoriteFilmList( getters.getUser.id, getters.getSession_id )
            .then( ( filmList ) => {
                commit( 'SET_FAVORITE_FILM_LIST', filmList )
            } )
    },
    clearGenderFilter( { commit } ) {
        commit( 'REMOVE_GENDER_FILTER' )
    },
    openFilters( { commit }, data ) {
        commit( 'OPENED_FILTERS', data )
    },
    setFilterPayload( { commit }, data ) {
        commit( 'SET_FILTER_PAYLOAD', data )
    }

}