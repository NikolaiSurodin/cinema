<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide class="slider-card" v-for="actor in actorList" :key="actor.id">
      {{ actor.name }}
      <img :src="getIMG_URL+actor.profile_path" alt="" @click="toActor(actor.id)"/>
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
  methods: {
    toActor( id ) {
      this.$router.push( `/actor/${ id }` )
    }
  },
  computed: {
    ...mapGetters( [ 'getIMG_URL' ] ),
    actorList() {
      if ( Object.keys( this.film ).length > 0 && this.film.credits.cast ) {
        return this.film.credits.cast
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

img:before {
  content: "";
  display: block;
  position: absolute;
  top: 17px;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(0 0 0);
  border: 2px solid rgb(153 153 153);
  border-radius: 5px;
}

img:after {
  content: "" attr(alt);
  display: block;
  font-size: 16px;
  font-style: normal;
  font-family: FontAwesome;
  color: rgb(100, 100, 100);

  position: absolute;
  top: 5px;
  left: 0;
  width: 100%;
  text-align: center;
}

@media (max-width: 722px) {
  .swiper {
    display: none;
  }
}
</style>