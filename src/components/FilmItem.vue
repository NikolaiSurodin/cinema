<template>
  <div>
    <template class="wrap" v-if="!showReview">
      <b-card :title="film.title" :img-src="film.img" img-alt="Image" img-top class="card">
        <b-icon icon="arrow-left-circle" scale="2" style="cursor: pointer" @click="goBack"></b-icon>
        <b-card-text style="color: white" class="card-body">
          {{ film.description }}
          <p class="actors-title">Актёры:</p>
          <div class="actors" v-for="(actor, idx) in film.actors" :key="idx">
            {{ actor }}
          </div>
          <p class="actors-title">Режиссёр:</p>
          {{ film.directors[0] }}
          <div class="button-review">
            <p>Review
              <b-icon style="cursor: pointer;padding: 0 2px;margin: 0 4px;" @click="sendReview" icon="info-circle-fill" scale="2" variant="info"></b-icon>
            </p>
          </div>
        </b-card-text>
        <template #footer style="position: relative">
          <iframe width="950" height="400" :src="film.url" title="YouTube video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>

          <footer>
            <div class="up-button-block">
              <b-button class="up-btn" @click="scrollUp">
                <b-icon icon="chevron-up" class="chevron-up"></b-icon>
              </b-button>
            </div>
          </footer>
        </template>
      </b-card>
    </template>
    <div :class="{'open':showReview}" v-else>
      <review-popup :review="film.review"

                    @close="showReview = false"
      />
    </div>
  </div>

</template>

<script>
import ReviewPopup from "@/components/popup/ReviewPopup";
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "FilmItem",
  components: {
    ReviewPopup
  },
  data() {
    return {
      showReview: false
    }
  },
  computed: {
    ...mapGetters( [ 'getFilmList' ] ),
    film() {
      let filterFilm = this.getFilmList.filter( film => film.id == this.$route.params.id )
      return filterFilm[0]
    }
  },
  methods: {
    ...mapActions( [ 'sendReview' ] ),
    sendReview() {
      this.showReview = true
    },
    scrollUp() {
      window.scrollTo( 0, 0 )
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.getFilmList
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
</style>