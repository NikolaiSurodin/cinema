<template>
  <footer class="footer">
    <div class="footer__info-section">
      <div class="footer__logo">
        <img src="../assets/svg/movieDB.svg" alt="logo">
      </div>
      <div class="footer__join-button" v-if="!getIsLoggedIn">
        <a
            role="button"
            class="button button-primary"
            href="https://www.themoviedb.org/"
            target="_blank"
        >
          Join to us
        </a>
      </div>
    </div>
    <div class="footer__social-section">
      <a v-for="(item, index) in socialIconList"
         :key="index"
      >
        <img :src="require(`../assets/social/icon_${item.icon}.png`)" height="80" width="39" alt="social"/>
      </a>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppFooter',
  data() {
    return {
      socialIconList: [
        {
          icon: 'facebook',
          path: '#'
        },
        {
          icon: 'twitter',
          path: '#'
        },
        {
          icon: 'telegram',
          path: '#'
        },
        {
          icon: 'github',
          path: '#'
        }
      ]
    }
  },
  computed: {
    ...mapGetters( [ 'getIsLoggedIn' ] )
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.footer {
  background: $blue-dark;
  position: relative;
  z-index: 100;

  &__info-section {
    padding: 15px 0 15px;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
  }

  &__social-section {
    background: white;
    display: flex;
    justify-content: space-around;
    padding: 10px 0 10px;

    p {
      width: 17rem;
      color: white;
    }

    a img {
      width: auto;
      height: 30px;
    }
  }

  &__logo {
    width: 195px;
    height: 94px;
  }
}

.footer-section {
  color: white;
}


ul {
  list-style-type: none;
}


</style>