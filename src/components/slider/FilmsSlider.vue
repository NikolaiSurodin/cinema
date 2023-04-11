<template>
    <swiper
            class="swiper"
            :options="swiperOption"

    >
        <swiper-slide
                class="slider-card"
                v-for="film in filmList"
                :key="film.id"
        >
            <img v-if="film.poster_path" :src="getIMG_URL+film.poster_path" @click="toFilm(film.id)" />
            <img v-else src="../../assets/no_photo.png" height="456" width="302" />
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
                slidesPerView: 3,
                spaceBetween: 10,
                breakpoints: {
                //     // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        // spaceBetween: 20
                    },
                //     // when window width is >= 480px
                    480: {
                        slidesPerView: 3,
                        // spaceBetween: 30
                    },
                //     // when window width is >= 640px
                    1024: {
                        slidesPerView: 2,
                        // spaceBetween: 40
                    }
                },
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
        ...mapGetters( [ 'getIMG_URL' ] )

    }
}
</script>

<style scoped>
.swiper {
    /*max-width: 60rem !important;*/
}

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