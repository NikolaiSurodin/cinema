<template>
    <div class="actor-page">
        <BackButton />
        <div class="actor-page__info">
            <div class="actor-page__img">
                <img :src="getIMG_URL+getActor.profile_path" alt="img">
            </div>
            <div class="actor-page__personal-information">
                Person Information
                <p>birthday</p>
                {{ getActor.birthday }}

                <p>place of birthday</p>
                {{ getActor.place_of_birth }}

                <p>birthday</p>
                {{ getActor.birthday }}
            </div>
        </div>

        <div class="actor-page__carrier-info">
            <div class="actor-page__actor-name">
                {{ getActor.name }}
            </div>
            <div class="actor-page__biography">
                {{ getActor.biography }}
            </div>
            <div class="actor-page__info_films">
                <films-slider :film-list="popFilms"
                              @toFilm="toFilm"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import FilmsSlider from '@/components/slider/FilmsSlider'
import BackButton from '@/components/_partial/BackButton'
export default {
    name: 'ActorPage',
    components: {
        FilmsSlider,
        BackButton
    },
    data() {
        return {
            loading: true
        }
    },
    methods: {
        ...mapActions( [ 'fetchActor', 'removeActor', 'fetchFilmListByPerson' ] ),
        toFilm( id ) {
            this.$router.push( `/films/${ id }` )
        }
    },
    computed: {
        ...mapGetters( [ 'getActor', 'getIMG_URL', 'getFilms' ] ),
        popFilms() {
            return this.getFilms
        }
    },
    mounted() {
        this.fetchFilmListByPerson( this.$route.params.id )
        this.fetchActor( this.$route.params.id )
            .then( () => {
                this.loading = false
            } )
    },
    beforeDestroy() {
        this.removeActor()
    }
}
</script>

<style lang="scss">
.actor-page {
  display: flex;
  padding: 30px;
  background-color: #efefef;
  max-width: 1440px;
  margin: 0 auto;

  &__info {

  }

  &__img {
    width: 20rem;
    height: 40rem;

    img {
      object-fit: cover;
      border-radius: 18px;
    }
  }

  &__actor-name {
    font-family: 'OpenSans';
    font-size: 48px;
    font-weight: 400;
    text-align: center;
  }

  &__biography {
    padding: 0 30px;
  }

}

</style>