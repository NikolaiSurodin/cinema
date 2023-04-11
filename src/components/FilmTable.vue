<template>
  <div class="films">
    <div class="films__list">
      <film-card
          v-for="film in filmList"
          :key="film.id"
          :film="film"
      />
    </div>
    <div class="films__load-button" :class="{ 'films__load-button--view': viewButton }">
      <button
          @click="loadingFilmList"
          class="button button-primary"
          ref="btn"
      >
        Load
      </button>
    </div>
  </div>
</template>

<script>
import FilmCard from '@/components/FilmCard'

export default {
  name: 'FilmTable',
  components: { FilmCard },
  data() {
    return {
      viewButton: false
    }
  },
  props: {
    filmList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    loadingFilmList() {
      this.$emit( 'loadData' )
      this.viewButton = false
    },
    test() {
      const options = {
        rootMargin: '0px 0px 85px 0px',
        threshold: 0
      }
      const callback = ( entries ) => {
        entries.forEach( ( entry ) => {
          if( entry.isIntersecting ) {
            this.viewButton = true
          }
        } )
      }
      const observer = new IntersectionObserver( callback, options )

      observer.observe( this.$refs[ 'btn' ] )
    }
  },
  mounted() {
    this.test()
  }
}
</script>

<style lang="scss">

.films {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 30px;
    row-gap: 50px;
    padding: 16px;
  }

  &__load-button {
    display: flex;
    justify-content: center;
    margin: 50px 0 50px;
    width: 100%;
    transition: all 0.5s;
    transform: translateY(10rem);
    opacity: 0;
  }

  &__load-button--view {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>