export default {
    SET_TOKEN( state, token ) {
        state.token = token
        localStorage.setItem( 'token', token )
        state.isLoggedIn = true
    },
    SET_USER( state, user ) {
        state.user = user
        console.log( user )
        console.log( state.user )
        localStorage.setItem( 'user', JSON.stringify( state.user ) )
    },
    SET_SESSION_ID( state, id ) {
        state.session_id = id
        localStorage.setItem( 'id', id )
    },
    LOGOUT( state ) {
        state.user = {}
        localStorage.removeItem( 'user' )
        state.token = ''
        localStorage.removeItem( 'token' )
        state.session_id = ''
        localStorage.removeItem( 'id' )
        state.isLoggedIn = false
    }
}