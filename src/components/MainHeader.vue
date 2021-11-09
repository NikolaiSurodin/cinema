<template>
  <div>
    <b-navbar type="dark" variant="dark" style="--bs-bg-opacity: 0;">
      <b-navbar-nav>
        <b-nav-item @click="toHome">Home</b-nav-item>
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item @click="toFavoriteFilms" v-if="getFavoriteFilms.length">
            You favorite films
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "MainHeader",
  data() {
    return{

    }
  },
  props:['value'],
  methods: {
    toFavoriteFilms() {
      this.$router.push( '/likeFilms' )
    },
    toHome() {
      this.$router.push( '/films' )
    },
  },
  computed: {
    ...mapGetters( [ 'getFavoriteFilms' ] )
  }
}
</script>

<style scoped>

</style>