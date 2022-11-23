<template>
    <div class="films-by-search gb-container">
        <header class="films-by-search__header">
            <custom-input
                    v-model="$route.query.search"
                    @input="loadData"
                    :is-scale="true"
                    placeholder="search for movie"
            />
        </header>
        <section class="films-by-search__content">
            <div class="films-by-search__categories">
                <div class="films-by-search__categories-header">Search Results</div>
                <div class="films-by-search__categories-item">Movies</div>
                <div class="films-by-search__categories-item">TV SHOW</div>
                <div class="films-by-search__categories-item">People</div>
            </div>
            <div class="films-by-search__results">
                <film-table
                        :film-list="filmList"
                        @loadData="loadData"
                />
            </div>
            <div class="films-by-search__no-results">
                There are no movies that matched your query.
            </div>
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
            filmList: []
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        loadData() {
            searchFilm( this.$route.query.search ).then( ( response ) => {
                this.filmList = response
            } )
        }
    }
}
</script>

<style lang="scss">
.films-by-search {
  &__content {
    display: flex;
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
}

</style>