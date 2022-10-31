import { getToken, login, openSession, account } from "@/services/me.service"

export default {

    fetchToken( { commit } ) {
        return new Promise( resolve => {
            getToken()
                .then( ( token ) => {
                    commit( 'SET_TOKEN', token )
                    resolve()
                } )
        } )
    },
    sendLogin( { dispatch, state } ) {
        dispatch( 'fetchToken' )
            .then( () => {
                const TOKEN = state.token
                window.location.href = `https://www.themoviedb.org/authenticate/${ TOKEN }`
            } )
    },
    login( { commit, dispatch, state }, user ) {
        return new Promise( ( resolve, reject ) => {
            dispatch( 'fetchToken' )
                .then( () => {
                    user.request_token = state.token
                    login( user )
                        .then( () => {
                            openSession( { request_token: state.token } )
                                .then( ( session ) => {
                                    commit( 'SET_SESSION_ID', session.data.session_id )
                                    dispatch( 'fetchAccount' )
                                    resolve()
                                } )
                        } )
                        .catch( () => {
                            dispatch( 'logout' )
                            reject()
                        } )
                } )

        } )
    },
    logout( { commit } ) {
        return new Promise( resolve => {
            commit( 'LOGOUT' )
            resolve()
        } )
    },
    fetchAccount( { commit, state } ) {
        return new Promise( resolve => {
            account( state.session_id )
                .then( ( user ) => {
                    commit( 'SET_USER', user )
                    resolve()
                } )
        } )
    }
}