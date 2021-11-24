export default {
    token: localStorage.getItem( 'token' ) || '',
    user: JSON.parse( localStorage.getItem( 'user' ) ) || {},
    session_id: localStorage.getItem( 'id' ) || '',
    isLoggedIn: localStorage.getItem( 'token' ) !== null,
}