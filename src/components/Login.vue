<template>
  <div class="login">
    <div class="login__bg">
      <img :src="getImgUrl()" alt="">
    </div>
    <form class="form">
      <p class="text">Sign In to your account</p>
      <b-input-group size="md" class="mb-3">
        <b-input-group-prepend is-text>
          <b-icon icon="person"></b-icon>
        </b-input-group-prepend>
        <b-form-input class="form-input"
                      placeholder="username"
                      required
                      v-model="user.username"
        />
      </b-input-group>

      <b-input-group size="md">
        <b-input-group-prepend is-text>
          <b-icon icon="lock"></b-icon>
        </b-input-group-prepend>

        <b-form-input class="form-input"
                      type="password"
                      placeholder="password"
                      required
                      v-model.trim="user.password"
        />
      </b-input-group>

      <div>
        <button class="mt-3 button btn-primary login__button"
                type="submit"
                @click.prevent="loginClick"
        >
          <b-spinner variant="primary" small v-if="loading"></b-spinner>
          login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { getRandomImage } from '@/helpers/getRandomImage'

export default {
  name: "Login",
  data() {
    return {
      error: false,
      loading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions( [ 'login', 'sendLogin' ] ),

    getImgUrl() {
      return require( '../assets/images/bg/' + getRandomImage() + '.jpg' )
    },

    loginClick() {
      this.loading = true
      this.login( this.user )
          .then( () => {
            this.$router.push( { path: '/films', hash: 'page=1' } )
          } )
          .catch( () => {
            this.$popup.error( 'ERROR' )
            this.loading = false
          } )
    }

  }
}
</script>

<style scoped lang="scss">
.login {
  position: relative;
  height: calc(100vh - 223px);

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;

    img {
      object-fit: cover;
    }
  }
  &__button {
    height: 32px;
  }
}

.form {
  width: 100%;
  padding: 15px;
  margin: auto;
  border: 1px solid #20a8d8;
  margin-top: 150px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background: transparent;
  max-width: 25rem;
  border-radius: 5px;
  box-shadow: 1px -1px 11px -4px;

}

.form-input {
  height: 2rem;
}

.input-group-text {
  background: #20a8d8;
  border: transparent;
}

input {
  background-color: white;
  border: transparent;
}

.input-group {
  margin-left: -6px;
}

.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
  margin-left: -6px;
}

.btn-primary {
  color: #fff;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.text {
  color: white;
}
</style>