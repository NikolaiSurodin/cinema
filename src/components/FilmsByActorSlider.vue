<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide class="slider-card" v-for="film in films" :key="film.id">
      <img :src="url+film.poster_path" alt="photo" @click="toFilm(film.id)"/>
      {{ film.title }}
    </swiper-slide>
  </swiper>
</template>

<script>
import { mapActions } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: "FilmsByActorSlider",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    id: String,
    films: Array,
    url: String
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  methods: {
    ...mapActions( [ 'fetchFilmListByPerson' ] ),
    toFilm( id ) {
      this.$router.push( `/films/${ id }` )
    }
  },
  mounted() {
    this.fetchFilmListByPerson( this.id )
  }
}
</script>

<style scoped>
.actor-section__info_films {
  position: absolute;
}

img {
  height: 170px;
  width: 119px;
}

.slider-card {
  width: 32px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 150px;
  height: 100%;
}

.swiper-container {
  cursor: grab;
  padding: 20px;
}

.swiper {
  width: 100%;
  max-width: 50rem;
}

@media (max-width: 722px) {
  .swiper {
    display: none;
  }
}
</style>