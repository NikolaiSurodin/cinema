<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide
                class="slider-card"
                v-for="actor in actorList"
                :key="actor.id"
        >
            <img
                    v-if="actor.profile_path"
                    :src="getIMG_URL+actor.profile_path"
                    @click="toActor(actor.id)"
                    alt=""
            />
            <img
                    v-else
                    src="../../assets/no_photo.png" height="456" width="302"
                    alt=""
            />
            {{ actor.name }}
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { mapGetters } from 'vuex'

export default {
    name: 'ActorsSlider',
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
        actorList: {
            type: Array,
            default: () => ( [] )
        }
    },
    methods: {
        toActor( id ) {
            this.$emit( 'toActor', id )
        }
    },
    computed: {
        ...mapGetters( [ 'getIMG_URL' ] )
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
        /*display: none;*/
    }

    .slider-card {
        margin-right: 101px !important;
    }
}
</style>