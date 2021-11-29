<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide class="slider-card" v-for="actor in actorList" :key="actor.id">
      <img v-if="actor.profile_path" :src="getIMG_URL+actor.profile_path" @click="toActor(actor.id)"/>
      <img v-else src="../../assets/no_photo.png" height="456" width="302"/>
      {{ actor.name }}
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { mapGetters } from 'vuex'
export default {
  name: "ActorsSlider",
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
    actorList: Array
  },
  methods: {
    toActor( id ) {
      this.$emit( 'toActor', id )
    }
  },
  computed: {
    ...mapGetters( [ 'getIMG_URL' ] ),
    // actorList() {
    //   if ( Object.keys( this.film ).length > 0 && this.film.credits.cast ) {
    //     return this.film.credits.cast
    //   }
    //   return ''
    // }
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

@media (max-width: 722px) {
  .swiper {
    display: none;
  }
}
</style>