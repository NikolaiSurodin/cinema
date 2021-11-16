<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide class="slider-card" v-for="actor in actorList" :key="actor.id">
      {{ actor.name }}
      <img :src="getIMG_URL+actor.profile_path"/>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { mapGetters } from 'vuex'

export default {
  name: 'slider',
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
    film: Object
  },
  computed: {
    ...mapGetters( [ 'getIMG_URL' ] ),
    actorList() {
      if ( Object.keys( this.film ).length > 0 && this.film.credits.cast ) {
        return this.film.credits.cast
      }
      return ''

    },
    username: function () {
      if ( Object.keys( this.getUser ).length > 0 && this.getUser.public_id ) {
        return this.getUser.profile.full_name
      }
      return ''
    }

  }
}
</script>

<style scoped>
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
</style>