<template>
    <div class="side-bar">
        <div
                v-b-toggle.collapse-1 class="m-1 side-bar__filter-block">
            Sort
            <span style="width: 15px; height: 15px;">
            <img src="../assets/svg/arrow.svg">
            </span>
        </div>
        <b-collapse id="collapse-1">
            <b-dropdown id="dropdown-left" :text="activeFilter" class="m-2">
                <b-dropdown-item
                        href="#"
                        v-for="( item, index ) in sortingFilters"
                        :key="index"
                        @click="setACtiveFilter( item )"
                >
                    {{ item.name }}
                </b-dropdown-item>
            </b-dropdown>
        </b-collapse>

        <div v-b-toggle.collapse-2 class="m-1 side-bar__filter-block">
            Filters
            <span style="width: 15px; height: 15px;">
            <img src="../assets/svg/arrow.svg">
            </span>
        </div>
        <b-collapse id="collapse-2">
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
                <genres-list />
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
        </b-collapse>
        <div>
            <button class="button button-primary" @click="search">Search</button>

            <button class="button button-secondary" @click="removeFilter">
                Remove you filter
            </button>
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


export default {
    name: 'FilterSideBar',
    components: {
        GenresList,
        SearchDropdown
    },
    data() {
        return {
            isShow: false,
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
    computed: {
        ...mapGetters( [ 'getGenresList', 'getActiveGenreListIdList' ] )
    },
    methods: {
        ...mapActions( [
            'setFilterPayload',
            'removeActiveGenreList'
        ] ),

        setACtiveFilter( e ) {
            this.activeFilter = e.name
            this.activeFilterCode = e.filer_code
        },
        setActiveCertificate( item ) {
            if( !item.active ) {
                item.active = true
                this.activeCertificateList.push( item )
            } else {
                item.active = false
                this.activeCertificateList = [ ...this.activeCertificateList.filter( el => el.name !== item.name ) ]
            }
        },
        search() {
            const wordId = this.chosenWordList.reduce( ( acc, item ) => {
                acc.push( item.id )
                return acc
            }, [] )
            const certificationListId = this.activeCertificateList.reduce( ( acc, item ) => {
                acc.push( item.value )
                return acc
            }, [] )
            this.setFilterPayload( {
                sort_by: this.activeFilterCode,
                certification: certificationListId.toString(),
                with_genres: this.getActiveGenreListIdList.toString(),
                with_keywords: wordId.toString()
            } )
        },
        searchKeyWords() {
            if( this.keyWord ) {
                getKeyWordList( this.keyWord ).then( list => {
                    this.keyWordList = list
                } )
            } else {
                this.keyWordList = []
            }
        },
        debounceSearch: _.debounce( function() {
            this.searchKeyWords()
        }, 300 ),

        chooseWord( item ) {
            if( this.chosenWordList.find( el => el.id === item.id ) ) {
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
            })
            this.activeCertificateList = []
            this.chosenWordList = []
            this.removeActiveGenreList()
            this.setFilterPayload( this.defaultFilterPayload )
        },
        clearSearch() {
            this.keyWord = ''
            this.keyWordList = []
        }
    }
}
</script>

<style lang="scss">
.side-bar {
  color: black;
  height: 100vh;
  background-color: white;
  border-radius: 8px;
  z-index: 1050;
  padding: 16px;
  margin: 16px;

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
}

</style>