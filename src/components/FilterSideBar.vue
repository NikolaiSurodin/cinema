<template>
  <div class="side-bar">
    <div
        class="side-bar__scroll-input-search"
        :class="{'side-bar__scroll-input-search--show': isShowInputSearch}"
        ref="searchInput"
    >
      <custom-input
          v-model="searchFilmInput"
          :search="searchFilmInput"
          :is-button="false"
          @searchFilm="searchFilm"
      />
    </div>
    <div class="m-1 side-bar__filter-block">
      Filters
      <span style="width: 15px; height: 15px;">
            <img src="../assets/svg/arrow.svg" alt="arrow">
            </span>
    </div>
    <div class="side-bar__filter-item-wrapper">
      Certification
      <div class="side-bar__filter-item">
        <div
            class="side-bar__certification-item"
            :class="{'side-bar__certification-item--active': item.active}"
            role="button"
            v-for="( item, index ) in certificateList"
            :key="index"
            @click="setActiveCertificate( item )"
        >
          {{ item.value }}
        </div>
      </div>

    </div>
    <div class="side-bar__filter-item-wrapper">
      Genres
      <genres-list/>
    </div>
    <div class="side-bar__filter-item-wrapper side-bar__key-word-section">
      Keywords
      <search-dropdown
          v-model="keyWord"
          :key-word-list="keyWordList"
          :chosen-word-list="chosenWordList"
          @chooseWord="chooseWord"
          @removeChosenWord="removeChosenWord"
          @clearSearch="clearSearch"
          @input="debounceSearch"
      />
    </div>
    <div>
      <div class="side-bar__bottom">
        <button
            :disabled="isEmptyFilter"
            class="button button-primary"
            @click="search"
        >
          Search
        </button>

        <button
            class="button button-secondary"
            @click="removeFilter"
            :disabled="isEmptyFilter"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SORT_BY from '@/const/filters/sorting.filters'
import { getKeyWordList } from '@/services/keyWords.service'

import GenresList from '@/components/GenresList'

import SearchDropdown from '@/components/_partial/SearchDropdown'
import _ from 'lodash'
import CustomInput from "@/components/_partial/CustomInput.vue";

export default {
  name: 'FilterSideBar',
  components: {
    CustomInput,
    GenresList,
    SearchDropdown
  },
  props: {
    isShowInputSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      searchFilmInput: '',
      sortingFilters: SORT_BY,
      activeFilter: 'Choose filter',
      activeFilterCode: SORT_BY[ 0 ].filer_code,
      activeCertificateList: [],
      keyWordList: [],
      keyWord: '',
      chosenWordList: [],
      chosenWordIdList: [],
      certificateList: [
        {
          name: 'NR',
          value: 'NR',
          active: false
        },
        {
          name: 'zero',
          value: '0+',
          active: false
        },
        {
          name: 'six',
          value: '6+',
          active: false
        },
        {
          name: 'twelve',
          value: '12+',
          active: false
        },
        {
          name: 'sixteen',
          value: '16+',
          active: false
        },
        {
          name: 'eighteen',
          value: '18+',
          active: false
        }
      ],
      defaultFilterPayload: {
        sort_by: SORT_BY[ 0 ].filer_code,
        certification: '',
        with_genres: '',
        with_keywords: ''
      }
    }
  },
  mounted() {
    this.removeFilter()
  },
  computed: {
    ...mapGetters( [ 'getGenresList', 'getActiveGenreListIdList' ] ),
    isEmptyFilter() {
      return !this.getActiveGenreListIdList.length && !this.chosenWordList.length && !this.activeCertificateList.length
    }
  },
  methods: {
    ...mapActions( [
      'setFilterPayload',
      'removeActiveGenreList'
    ] ),

    searchFilm() {
      if ( this.searchFilmInput ) {
        this.$router.push( { path: '/search', query: { search: this.searchFilmInput } } )
      }
    },
    setActiveFilter( e ) {
      this.activeFilter = e.name
      this.activeFilterCode = e.filer_code
    },
    setActiveCertificate( item ) {
      if ( !item.active ) {
        item.active = true
        this.activeCertificateList.push( item )
      } else {
        item.active = false
        this.activeCertificateList = this.activeCertificateList.filter( el => el.name !== item.name )
      }
    },
    setIdList( arr, isId ) {
      return arr.reduce( ( acc, item ) => {
        acc.push( isId ? item.id : item.value )
        return acc
      }, [] )
    },
    search() {
      if ( !this.isEmptyFilter ) {
        const wordId = this.setIdList( this.chosenWordList, true )
        const certificationListId = this.setIdList( this.activeCertificateList, false )

        this.setFilterPayload( {
          sort_by: this.activeFilterCode,
          certification: certificationListId.toString(),
          with_genres: this.getActiveGenreListIdList.toString(),
          with_keywords: wordId.toString()
        } )
        this.$emit( 'searchFilms' )
      }
    },
    searchKeyWords() {
      if ( this.keyWord ) {
        getKeyWordList( this.keyWord )
            .then( list => {
              this.keyWordList = list
            } )
      } else {
        this.keyWordList = []
      }
    },
    debounceSearch: _.debounce( function () {
      this.searchKeyWords()
    }, 300 ),

    chooseWord( item ) {
      if ( this.chosenWordList.find( el => el.id === item.id ) ) {
        this.removeChosenWord( item )
      } else {
        this.chosenWordList.push( item )
      }
    },
    removeChosenWord( word ) {
      this.chosenWordList = this.chosenWordList.filter( el => el.id !== word.id )
    },
    removeFilter() {
      this.activeCertificateList.forEach( item => {
        item.active = false
      } )
      this.activeCertificateList = []
      this.chosenWordList = []
      this.removeActiveGenreList()
      this.setFilterPayload( this.defaultFilterPayload )
      this.$emit( 'clearFilter' )
    },
    clearSearch() {
      this.keyWord = ''
      this.keyWordList = []
    },

  }
}
</script>

<style lang="scss">
@import "@/assets/variables";

.side-bar {
  color: black;
  background-color: white;
  padding: 16px;
  position: sticky;
  top: $header-height;

  &__bottom {
    display: flex;
    justify-content: center;
    margin-top: 50px;

    button {
      &:first-child {
        margin-right: 10px;
      }
    }

  }

  &__filter-block {
    display: flex;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 8px;
    box-shadow: 0 2px 8px;
    padding: 14px 16px;
    min-width: 250px;
  }

  &__certification-item {
    display: inline-flex;
    border: 1px solid #9e9e9e;
    border-radius: 14px;
    padding: 4px 12px;
    font-size: 0.9em;
    margin-right: 6px;
    margin-top: 8px;
    background-color: white;

    &:hover {
      background-color: #1F3197;
      color: white;
    }

    &--active {
      background-color: #5162ce !important;
      color: white;
    }
  }

  &__filter-item-wrapper {
    display: flex;
    flex-direction: column;
    margin: 10px;
    max-width: 450px;
  }

  &__key-word-section {
    color: white;

    input {
      outline: auto;
      font-size: 14px;
      opacity: 0.6;
      color: #0a4a60;
    }
  }

  &__scroll-input-search {
    margin-bottom: 20px;
    transform: translateY(-56px);
    transition: transform 0.2s;

    &--show {
      transform: translateY(0);
    }
  }
  input {
    color: black;
  }
}

</style>