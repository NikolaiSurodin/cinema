<template>
  <div>
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
        <b-button class="mt-3"
                  variant="primary"
                  type="submit"
                  @click.prevent="loginClick"
        >
          <b-spinner variant="primary" small v-if="loading"></b-spinner>
          login
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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

<style scoped>
.form {
  width: 100%;
  padding: 15px;
  margin: auto;
  border: 1px transparent;
  margin-top: 50px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background: white;
  max-width: 25rem;
  border-radius: 5px;
  box-shadow: 1px -1px 11px -4px;
}

.form-input {
  height: 2.1rem;
}

.btn-primary {
  color: #fff;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.text {
  color: #73818f
}
</style>