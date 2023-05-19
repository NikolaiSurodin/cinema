<template>
  <div class="main-header">
    <div class="main-header__category">
      <div
          class="main-header__logo"
          role="button"
          @click="toMainPage"
      >
        <img
            src="@/assets/images/small_logo.svg"
            alt="logo"
            loading="lazy"
        >
      </div>
      <ul>
        <li>Movies</li>
        <li>Tv Shows</li>
        <li>People</li>
      </ul>
    </div>
    <div class="main-header__right-side">
      <div class="main-header__lang">
        <div
            class="main-header__select-lang"
            :class="{ 'main-header__select-lang--choice': isShowLangList }"
            role="button"
            @click.stop="isShowLangList = true"
        >

          <span>{{ getActiveLanguage }}</span>
        </div>
        <div
            v-if="isShowLangList"
            class="main-header__lang-list "
            v-click-outside="closeLangList"
        >
          <ul
              v-for="( item, index ) in langList"
              :key="index"
          >
            <li @click="switchLang( item.key )">{{ item.title }}</li>
          </ul>
        </div>
      </div>
      <div
          class="main-header__login"
          role="button"
          v-if="!getIsLoggedIn"
          @click="login"
      >
        Login
      </div>
      <div
          class="main-header__logout"
          role="button"
          @click="sendLogout"
          v-else
      >
        Logout
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import languages from '@/const/languages'

export default {
  name: 'MainHeader',
  data() {
    return {
      langList: languages,
      isShowLangList: false,
      activeLang: ''
    }
  },
  computed: {
    ...mapGetters( [ 'getFavoriteFilms', 'getIsLoggedIn' ] ),
    getActiveLanguage() {
      return localStorage.getItem( 'lang' ).split( '-' )[ 0 ]
    }
  },
  methods: {
    ...mapActions( [ 'logout' ] ),

    closeLangList() {
      if ( this.isShowLangList ) {
        this.isShowLangList = false
      }
    },

    toMainPage() {
      this.$router.push( '/films' )
    },

    toFavoriteFilms() {
      this.$router.push( '/likeFilms' )
    },
    sendLogout() {
      this.logout().then( () => {
        this.$router.push( '/films' )
      } )
    },
    login() {
      this.$router.push( '/login' )
    },
    switchLang( key ) {
      localStorage.setItem( 'lang', key )
      location.reload()
    }
  }

}
</script>

<style lang="scss">
@import "@/assets/variables";
@import "@/assets/media-mixin";

.main-header {
  position: fixed;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 35px;
  background: $header;
  color: $text;
  z-index: 10;
  @include mobile {
    padding: 5px 35px;
  }

  &__logo {
    width: 154px;
    height: 25px;
  }

  &__category {
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
      display: inline-flex;
      padding-left: 18px;
      @include tablet {
        display: none;
      }

      li {
        padding-right: 8px;
      }
    }

  }

  &__right-side {
    display: flex;
    align-items: center;
    width: 8rem;
    justify-content: space-between;
  }

  &__lang {
    position: relative;
    display: flex;
    justify-content: center;
  }


  &__select-lang {
    position: relative;
    display: block;
    padding: 3px;
    border: dashed 0.5px transparent;
    transition: all 0.2s;

    span {
      text-transform: capitalize;
    }

    &--choice {
      border: dashed 0.5px $text;
    }

    &:hover {
      border: dashed 0.5px $text;
    }
  }

  &__lang-list {
    position: absolute;
    background: $blue-color;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 3rem;
    z-index: 1;

    ul {
      li {
        padding: 5px 8px;
        cursor: pointer;
      }
    }
  }
}
</style>