<template>
  <div>
    <b-navbar type="dark" variant="dark" style="--bs-bg-opacity: 0;">
      <b-navbar-nav>
        <div class="d-flex flex-grow-0 justify-content-between">
          <div class="d-flex flex-grow-0">
            <b-nav-item @click="toHome">Home</b-nav-item>
            <b-nav-item-dropdown text="User" right>
              <b-dropdown-item href="#">Account</b-dropdown-item>
              <b-dropdown-item @click="toFavoriteFilms" v-if="getFavoriteFilms.length">
                You favorite films
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div>
            <b-nav-item @click="sendLogout">Logout</b-nav-item>
          </div>
        </div>

      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "MainHeader",
  data() {
    return {}
  },
  props: [ 'value' ],
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
        this.$router.push( '/' )
      } )
    }
  },
  computed: {
    ...mapGetters( [ 'getFavoriteFilms' ] )
  }
}
</script>

<style scoped>

</style>