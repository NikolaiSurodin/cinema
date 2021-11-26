import { person, filmsByPerson, popularPerson, searchPerson } from "@/services/actor.service"

export default {
    fetchActor( { commit }, id ) {
        return new Promise( resolve => {
            person( id )
                .then( ( actor ) => {
                    commit( 'SET_ACTOR', actor )
                    resolve()
                } )
        } )
    },
    fetchFilmListByPerson( { commit }, id ) {
        return new Promise( resolve => {
            filmsByPerson( id )
                .then( ( films ) => {
                    commit( 'SET_POPULAR_FILM_LIST_BY_ACTOR', films )
                    resolve()
                } )
        } )
    },
    fetchPopularPerson( { commit } ) {
        return new Promise( resolve => {
            popularPerson()
                .then( ( personList ) => {
                    commit( 'SET_POPUlAR_PERSON', personList )
                    resolve()
                } )
        } )
    },
    fetchSearchPerson( { commit }, search ) {
        return new Promise( resolve => {
            searchPerson( search )
                .then( ( person ) => {
                    commit( 'SET_SEARCH_PERSON', person )
                    resolve()
                } )
        } )
    },
    removeSearchPerson( { commit } ) {
        commit('CLEAR_SEARCH_PERSON')
    }
}
