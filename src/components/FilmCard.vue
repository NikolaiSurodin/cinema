<template>
  <b-card :title="film.title" :img-src="film.img" img-alt="Image" img-top class="card" @click="toFilm()">
    <b-card-text style="color: black">
      {{ film.description }}
    </b-card-text>
    <template #footer>
      <small class="text-muted">
        <p class="rating">
          <b-icon icon="star-fill" class="rating-icon"></b-icon>

          {{ film.rating }} ({{ film.year }})
        </p>
      </small>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "FilmCard",
  props: {
    film: Object
  },
  methods: {
    toFilm() {
      this.$router.push( `/films/${ this.film.id }` )
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
</style>