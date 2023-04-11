<template>
    <div class="actor-page">
        <BackButton />
        <div v-if="loading" class="main-layout-spinner">
            <b-spinner class="main-layout-spin" type="grow"></b-spinner>
        </div>
        <template v-else>
            <div class="actor-page__wrapper">
                <div class="actor-page__info">
                    <div class="actor-page__img">
                        <img :src="getIMG_URL+actor.profile_path" alt="img">
                    </div>
                    <div class="actor-page__personal-information">
                        Person Information
                        <p>birthday</p>
                        {{ actor.birthday }}

                        <p>place of birthday</p>
                        {{ actor.place_of_birth }}

                        <p>birthday</p>
                        {{ actor.birthday }}
                    </div>
                </div>
                <div class="actor-page__carrier-info">
                    <div class="actor-page__actor-name">
                        {{ actor.name }}
                    </div>
                    <div class="actor-page__biography">
                        {{ actor.biography }}
                    </div>
                    <div class="actor-page__popular-films" v-if="getPopularFilmListByActor.length">
                        <p>Known For</p>
                        <films-slider :film-list="getPopularFilmListByActor"
                                      @toFilm="toFilm"
                        />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { fetchPerson } from '@/services/actor.service'

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
            loading: true,
            actor: {},
            popularFilmListByActor: []
        }
    },
    methods: {
        ...mapActions( [ 'fetchActor', 'fetchFilmListByPerson' ] ),
        toFilm( id ) {
            this.$router.push( `/films/${ id }` )
        }
    },
    computed: {
        ...mapGetters( [ 'getActor', 'getIMG_URL', 'getPopularFilmListByActor' ] )
    },
    mounted() {
        fetchPerson( this.$route.params.id )
            .then( ( actor ) => {
                this.actor = actor
                this.loading = false
            } )
        this.fetchFilmListByPerson( this.$route.params.id )
    }
}
</script>

<style lang="scss">
.actor-page {
  background-color: #efefef;
  max-width: 1440px;
  margin: 0 auto;
  padding-top: 60px;
  min-height: 75vh;

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

  &__wrapper {
    display: flex;
    padding: 0 15px;
  }

  &__popular-films {
    p {
      text-align: center;
      font-size: 32px;
    }
  }

}

</style>