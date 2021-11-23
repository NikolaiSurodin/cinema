export default {
    SET_FILM_LIST( state, films ) {
        state.filmList = films
    },
    PUSH( state, data ) {
        data.forEach( el => state.filmList.push( el ) )
    },
    SET_FILM_INFO( state, film ) {
        state.film = film
    },
    CLEAR( state ) {
        state.film = {}
    },
    SET_GLOBAL_FILM( state, film ) {
        state.globalFilm = film
    },
    REMOVE_GLOBAL_FILM( state ) {
        state.globalFilm = {}
    },
    SET_LIKE_FILM( state, film ) {
        state.likesFilmList.push( film )
        localStorage.setItem( 'likesFilm', JSON.stringify( state.likesFilmList ) )
    },
    DELETE_LIKE_FILM( state, film ) {
        state.likesFilmList = state.likesFilmList.filter( el => el.id !== film.id )
        localStorage.setItem( 'likesFilm', JSON.stringify( state.likesFilmList ) )
    },
    SET_RECOMEND( state, films ) {
        state.recomendFilmList = films
    },
    CLEAR_RECOMEND_LIST( state ) {
        state.recomendFilmList = []
    },
    SET_POPULAR_FILM_LIST( state, films ) {
        state.popularFilmList = films
    },
    SET_SIMILAR_FILM_LIST( state, films ) {
        state.similarFIlmList = films
    },
    SET_GENRES_LIST( state, genres ) {
        genres.forEach( ( el ) => {
            state.genres.push( {
                name: el.name,
                id: el.id,
                isActive: false
            } )
        } )
    },
    REMOVE_GENRES_LIST( state ) {
        state.genres = []
    },
    SET_ACTIVE_GENRE( state, genre ) {
        genre.isActive = !genre.isActive
    },
    SET_FILMS_BY_GENRE( state, films ) {
        state.filmListByGenre = films
    },
    SET_FAVORITE_FILM_LIST( state, filmList ) {
        state.favoriteFilmList = filmList
        localStorage.setItem( 'favoriteFilms', JSON.stringify( state.favoriteFilmList ) )
    }
}