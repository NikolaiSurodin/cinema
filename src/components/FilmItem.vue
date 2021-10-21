<template>
  <div>
    <main>
      <b-card  style="margin: 5rem" :img-src="getIMG_URL+film.backdrop_path" img-alt="Image" img-left class="mb-3" v-if="!showReview">
        <b-card-text>
          <h1>{{ film.title }} ({{ new Date( film.release_date ).getFullYear() }})</h1>

          <div class="about">
            <h4>About:</h4>
            {{ film.overview }}
          </div>
          <div class="genres">
            <h4>Genres:</h4>
            <div v-for="genre in film.genres" :key="genre.id">
              {{ genre.name }}
            </div>
          </div>
          <div class="social-footer-card">
            <div class="social-item" >
              <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-13-heart-white-28d2cc2d6418c5047efcfd2438bfc5d109192671263c270993c05f130cc4584e.svg"/>

            </div>
          </div>
        </b-card-text>
      </b-card>
      <div :class="{'open':showReview}" v-else>
        <review-popup
            @close="showReview = false"
        />
      </div>
    </main>
  </div>

</template>

<script>
import ReviewPopup from "@/components/popup/ReviewPopup"
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "FilmItem",
  data() {
    return {
      showReview: false,
    }
  },
  components: {
    ReviewPopup
  },
  computed: {
    ...mapGetters( [
      'getIMG_URL',
      'getFilm'
    ] ),
    film() {
      return this.getFilm
    },

  },
  methods: {
    ...mapActions( [ 'fetchInfoDetailFilm', 'clearFIlmItem' ] ),
    sendReview() {
      this.showReview = true
    },
    scrollUp() {
      window.scrollTo( 0, 0 )
    },
    goBack() {
      this.$router.go( -1 )
    }
  },
  mounted() {
    this.fetchInfoDetailFilm( this.$route.params.id )
  },
  beforeDestroy() {
    this.clearFIlmItem()
  }

}
</script>

<style scoped>
.wrap {
  margin-top: 60px;
  display: grid;
  grid-gap: 2vw;
  padding: 4px;
}

.actors-title {
  padding: 4px;
  font-size: 18px;
}

.card-body {
  background: linear-gradient(
      352deg, black, #626262);
  color: #ffff;
}

.card-title {
  text-align: right;
}

.button-review {
  display: flex;
  justify-content: end;
}

.card-footer {
  display: flex;
  justify-content: center;
  background: linear-gradient(
      180deg, black, #626262);
}

.up-button-block {
  position: relative;
  bottom: -90%;
  left: 100%;
}

.up-btn {
  border-radius: 50%;
  height: 45px;
}

.review {
  transition: right 1s 1s;
}

.review :active {
  left: 0;
  transition: left 1s;
}

.open {
  transform: translateY(10%);
  transition: transform 1s, height 1s 1s;
  width: 100%;
  max-width: 100%;
}
.social-item {
  background-color: #000000;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  color: black;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
}
.social-item :hover {
  background-color: #626262;
  border-radius: 50%;

}
</style>