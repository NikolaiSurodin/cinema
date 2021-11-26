<template>
  <div>
    <main-header />
    <div class="container">
      <div class="actor-section d-flex">
        <div class="actor-section__img">
          <img :src="getIMG_URL+getActor.profile_path" alt="img">
          <div class="actor-section__person-info">
            <div class="actor-section__person-info__title">
              Person Information
            </div>
            <div class="actor-section__person-info__item">
              <p>birthday</p>
              {{ getActor.birthday }}
            </div>
            <div class="actor-section__person-info__item">
              <p>place of birthday</p>
              {{ getActor.place_of_birth }}
            </div>
          </div>
        </div>
        <div class="actor-section__info">
          <div class="actor-section__info_title">
            {{ getActor.name }}
          </div>
          <div class="actor-section__info_subtitle">
            biography
          </div>
          <div class="actor-section__info_text">
            {{ getActor.biography }}
          </div>
          <div class="actor-section__info_films">
            <films-by-actor-slider :id="this.$route.params.id"
                                   :films="popFilms"
                                   :url="getIMG_URL"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FilmsByActorSlider from "@/components/FilmsByActorSlider"
import MainHeader from "@/components/MainHeader"

export default {
  name: "ActorPage",
  components: {
    FilmsByActorSlider,
    MainHeader
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    ...mapActions( [ 'fetchActor' ] ),
  },
  computed: {
    ...mapGetters( [ 'getActor', 'getIMG_URL', 'getFilms' ] ),
    popFilms() {
      return this.getFilms
    }
  },
  mounted() {
    this.fetchActor( this.$route.params.id )
        .then( () => {
          this.loading = false
        } )
  },
}
</script>

<style scoped>
.container {
  border: 1px solid;
  margin: 50px auto;
}
.container {
  border:none
}
.actor-section__img {
  width: 20rem;
}

.actor-section__img img {
  width: 20rem;
}

.actor-section__info_subtitle {
  text-align: center;
  text-transform: uppercase;
  font-size: 20px
}

.actor-section__info_title {
  font-size: 40px;
}

.actor-section__info_text {
  padding: 15px;
}

.actor-section__person-info__item {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  line-height: 1;
}

.actor-section__person-info__item :last-child {
  margin-top: 15px;
}
</style>