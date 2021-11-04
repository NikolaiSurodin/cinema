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
        state.likesFilm.push( film )
        localStorage.setItem( 'likesFilms', JSON.stringify( state.likesFilm ) )
    },
    DELETE_LIKE_FILM( state, film ) {
        state.likesFilm = state.likesFilm.filter( el => el.id !== film.id )
        localStorage.setItem('likesFilms', JSON.stringify(state.likesFilm))
    },
    SET_RECOMEND( state, films ) {
        state.recomendFilmList = films
    },
    CLEAR_RECOMEND_LIST( state ) {
        state.recomendFilmList = []
    },
    TEST(state, test){
        console.log(test)
    }
}