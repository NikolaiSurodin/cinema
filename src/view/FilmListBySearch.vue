<template>
    <div class="films-by-search gb-container">
        <header class="films-by-search__header">
            <custom-input
                    v-model="search"
                    :search="search"
                    @searchFilm="searchFilm"
                    :is-scale="true"
                    placeholder="search for movie"
            />
        </header>
        <section class="films-by-search__no-results" v-if="!filmList.length">
            There are no movies that matched your query.
        </section>
        <section class="films-by-search__content" v-else>
                <film-table
                        :film-list="filmList"
                        @loadData="loadByPage"
                />
        </section>
    </div>
</template>

<script>
import CustomInput from '@/components/_partial/CustomInput'
import FilmTable from '@/components/FilmTable'

import { searchFilm } from '@/services/film.service'

export default {
    name: 'FilmListBySearch',
    components: {
        CustomInput,
        FilmTable
    },
    data() {
        return {
            search: '',
            page: 1,
            filmList: []
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        loadByPage() {
          this.page++
          this.loadData()
        },
        searchFilm() {
          this.page = 1
          this.filmList = []
          this.$router.push( { query: { search: this.search } } )
          this.loadData()
        },
        loadData() {
            searchFilm( this.$route.query.search, this.page )
                .then( ( filmList ) => {
                    this.filmList = [ ...this.filmList, ...filmList ]
                } )
        }
    }
}
</script>

<style lang="scss">

.films-by-search {
  padding-top: 56px;

  &__header {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

  &__content {
    margin-top: 50px;
  }
  &__no-results {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__categories {
    max-width: 150px;
    border: 1px solid;
    border-radius: 5px;
  }

  &__categories-header {
    background-color: cornflowerblue;
    color: white;
    padding: 8px 15px;
    flex-shrink: 0;
  }
  input {
    color: black
  }
  input::-webkit-input-placeholder {
    color: black;
  }
}

</style>