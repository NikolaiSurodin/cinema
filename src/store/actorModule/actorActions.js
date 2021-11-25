import { person } from "@/services/actor.service"

export default {
    fetchActor( { commit }, id ) {
        return new Promise( resolve => {
            person( id )
                .then( ( actor ) => {
                    commit( 'SET_ACTOR', actor )
                    resolve()
                } )
        } )

    }
}