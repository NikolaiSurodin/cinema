<template>
  <div>
    <form class="form">
      <h1 class="h3 mb-3 font-weight-normal" style="text-align: center; font-size: 30px; font-weight: bold;">Login</h1>
      <p class="text">Sign In to your account</p>
      <b-input-group size="md" class="mb-3">
        <b-input-group-prepend is-text>
          <b-icon icon="envelope"></b-icon>
        </b-input-group-prepend>
        <b-form-input class="form-input"
                      type="email"
                      placeholder="me@example.com"
                      required
                      v-model="user.email"
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
                  :disabled="!user.password || !user.email"
                  @click.prevent="loginClick"
        >
          Login
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      error: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    loginClick() {
      if ( this.user.email === 'kolya@mail.ru' && this.user.password === '1234') {
        this.$router.push('/films')
      }
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
  /* display: inline-block; */
  /* justify-content: center; */
  /* align-items: center; */
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background: white;
  max-width: 25rem;
  height: 20rem;
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