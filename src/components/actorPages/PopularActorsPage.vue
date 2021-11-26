<template>
  <div>
    <main-header/>
    <div class="container">
      <div class="title">
        Popular Person
      </div>
      <div class="search">
        <b-input v-model="search" @keydown.enter.prevent="toSearchPerson"></b-input>
        <b-button @click="toSearchPerson">search</b-button>
      </div>
      <div class="popular-person">
        <popular-actor-item v-for="actor in getPopularPerson"
                            :key="actor.id"
                            :actor="actor"
                            :url="getIMG_URL"
        />
      </div>

    </div>
    <pagination/>
  </div>
</template>

<script>
import PopularActorItem from "@/components/actorPages/PopularActorItem"
import MainHeader from "@/components/MainHeader"
import Pagination from "@/components/Pagination"

import { mapActions, mapGetters } from 'vuex'

export default {
  name: "PopularActorsPage",
  data() {
    return {
      loading: true,
      search: ''
    }
  },
  components: { Pagination, MainHeader, PopularActorItem },
  methods: {
    ...mapActions( [ 'fetchPopularPerson', 'fetchSearchPerson', 'removeSearchPerson' ] ),
    toSearchPerson() {
      this.fetchSearchPerson( this.search )
          .then( () => {
            this.$popup.infoActor( '', `${ this.person.name }`, `${ this.person.profile_path }`, '', '' )
                .then( ( result ) => {
                  if ( result.isConfirmed ) {
                    this.$router.push( `actor/${ this.person.id }` )
                  } else {
                    this.removeSearchPerson()
                  }
                } )
          } )
    }
  },
  computed: {
    ...mapGetters( [ 'getPopularPerson', 'getSearchPerson', 'getIMG_URL' ] ),
    person() {
      if ( Object.keys( this.getSearchPerson ).length > 0 && this.getSearchPerson.id ) {
        return this.getSearchPerson
      }
      return ''
    }
  },
  created() {
    this.fetchPopularPerson().then( () => this.loading = false )
  }
}
</script>

<style scoped>
.popular-person {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>