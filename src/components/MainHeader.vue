<template>
    <div>
        <b-navbar type="dark" variant="dark" fixed="true">
            <b-navbar-nav>
                <div class="d-flex flex-grow-0 justify-content-between">
                    <div class="d-flex flex-grow-0">
                        <b-nav-item @click="toHome">Movies</b-nav-item>
                        <b-nav-item-dropdown text="User" right>
                            <b-dropdown-item>
                                <router-link to="/account">
                                    Account
                                </router-link>

                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </div>
                    <div>
                        <b-nav-item
                                @click="sendLogout"
                                v-if="getIsLoggedIn"
                        >
                            Logout
                        </b-nav-item>
                        <b-nav-item
                                @click="login"
                                v-else
                        >
                            Login
                        </b-nav-item>
                    </div>
                </div>

            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'MainHeader',
    data() {
        return {}
    },
    props: [ 'value' ],
    computed: {
        ...mapGetters( [ 'getFavoriteFilms', 'getIsLoggedIn' ] )
    },
    methods: {
        ...mapActions( [ 'logout' ] ),

        toFavoriteFilms() {
            this.$router.push( '/likeFilms' )
        },
        toHome() {
            this.$router.push( '/films' )
        },
        sendLogout() {
            this.logout().then( () => {
                this.$router.push( '/films' )
            } )
        },
        login() {
            this.$router.push( '/login' )
        }
    }

}
</script>

<style scoped>

</style>