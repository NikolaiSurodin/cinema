export default {
    SET_ACTOR( state, actor ) {
        state.actor = actor
    },
    SET_POPULAR_FILM_LIST_BY_ACTOR( state, films ) {
        state.popularFilmListByActor = films.sort( ( a, b ) => b.popularity - a.popularity ).slice( 0, 10 )
    },
    SET_POPUlAR_PERSON( state, personList ) {
        state.personList = personList
    },
    SET_SEARCH_PERSON( state, person ) {
        state.searchPerson = person
    },
    CLEAR_SEARCH_PERSON( state ) {
        state.searchPerson = {}
    },
    CLEAR_STATE_ACTOR( state ) {
        state.actor = {}
    },
    CLEAR_POPULAR_PERSON_LIST( state ) {
        state.personList = []
    }

}