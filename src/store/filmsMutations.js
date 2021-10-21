export default {
    SET_FILM_LIST(state, films) {
        state.filmList = films
    },
    PUSH(state, data) {
        data.forEach( el => state.filmList.push( el ) )
    },
    SET_FILM_INFO(state, film) {
        state.film = film
    },
    CLEAR(state){
        state.film = {}
    },
    SET_GLOBAL_FILM(state, film){
        state.globalFilm = film
    },
    REMOVE_GLOBAL_FILM(state){
        state.globalFilm = {}
    }
}