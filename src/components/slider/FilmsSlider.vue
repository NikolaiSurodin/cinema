<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide class="slider-card" v-for="film in filmList" :key="film.id">
      <img v-if="film.poster_path" :src="getIMG_URL+film.poster_path" @click="toFilm(film.id)"/>
      <img v-else src="../../assets/no_photo.png" height="456" width="302"/>
      {{ film.title }}
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { mapGetters } from 'vuex'

export default {
  name: 'FilmsSlider',
  components: {
    Swiper,
    SwiperSlide
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
  props: {
    filmList: Array
  },
  methods: {
    toFilm( id ) {
      this.$emit( 'toFilm', id )
    }
  },
  computed: {
    ...mapGetters( [ 'getIMG_URL' ] ),

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
    /*display: none;*/
  }
}
</style>