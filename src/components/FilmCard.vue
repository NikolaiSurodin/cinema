<template>
  <b-card :title="film.title" :img-src="getIMG_URL+film.poster_path" img-alt="Image" img-top class="card"
          @click="toFilm()">
    <b-card-text class="text" style="color: black">
      {{ filmOverview }}
    </b-card-text>
    <template #footer>
      <small class="text-muted">
        <p class="rating">
          <b-icon icon="star-fill" class="rating-icon"></b-icon>
          {{ film.vote_average }} ({{ new Date( film.release_date ).getFullYear() }})
        </p>
      </small>
    </template>
  </b-card>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "FilmCard",
  data() {
    return {}
  },
  props: {
    film: Object
  },
  methods: {
    toFilm() {
      this.$router.push( `/films/${ this.film.id }` )
    }
  },
  computed: {
    ...mapGetters( [ 'getIMG_URL' ] ),
    filmOverview() {
      return this.film.overview !== '' ? this.film.overview : 'Overview no'
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
  box-shadow: 1px 1px 1px white;
  transition: 1s;
}

.card :hover {
  filter: grayscale(0);
}

.rating {
  text-align: end;
}

.rating-icon {
  color: burlywood;
}

.card h4 {
  color: darkcyan;
}
.text {
  color: black;
  word-break: break-word;
  display: block;
  height: 94px;
  text-overflow: ellipsis;
  /* width: 370px; */
  /* white-space: nowrap; */
  overflow: hidden;
}
</style>