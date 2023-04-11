<template>
    <div class="main-header">
        <b-navbar type="dark" variant="dark" fixed="true">
            <b-navbar-nav>
                <div class="d-flex flex-grow-0 justify-content-between">
                    <div class="d-flex flex-grow-0">
                        <b-nav-item @click="toHome">Movies</b-nav-item>
                        <b-nav-item-dropdown text="User" right v-if="getIsLoggedIn">
                            <b-dropdown-item>
                                <router-link to="/account">
                                    Account
                                </router-link>

                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown text="Lang" right>
                            <b-dropdown-item
                                    v-for="( item, index ) in langList"
                                    :key="index"
                            >
                                <div class="lang" @click="switchLang(item.key)">
                                    {{ item.title }}
                                </div>
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

import languages from '@/const/languages'

export default {
    name: 'MainHeader',
    data() {
        return {
            langList: languages
        }
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
        },
        switchLang( key ) {
            localStorage.setItem( 'lang', key )
            location.reload()
        }
    }

}
</script>

<style scoped>
.main-header {

}
</style>