<template>
  <div>
    <div class="container">
      <div class="actor-section">
        <div class="actor-section__img">
          <img :src="getIMG_URL+getActor.profile_path" alt="img">
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
        </div>
        <div class="actor-films">
          slider
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "ActorPage",
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    ...mapActions( [ 'fetchActor' ] ),
  },
  computed: {
    ...mapGetters( [ 'getActor', 'getIMG_URL' ] ),
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

</style>