<template>
    <div class="account">
        <section class="account__header">
            <div class="account__content">
                <div class="account__avatar">
                    <span
                            v-if="getUser.avatar.tmdb.avatar_path === null"
                    >{{ userNoAvatar }}
                    </span>
                    <img
                            :src="userAvatar"
                            alt=""
                            v-else
                    >
                </div>
                <div class="account__info">
                    <div class="account__name">{{ this.getUser.username }}</div>
                    <div class="account__rating">
                        <div class="account__rating-circle">10%</div>
                        <div class="account__rating-description">
                            Average Movie Score
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="account__menu">
            <b-dropdown
                    id="dropdown-1"
                    text="Overview"
                    class="m-md-2 btn-primary"
            >
                <b-dropdown-item>Main</b-dropdown-item>
                <b-dropdown-item @click="toFavoriteFilms">Favorites</b-dropdown-item>
                <b-dropdown-item>Recommendations</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item active>Edit Profile</b-dropdown-item>
            </b-dropdown>
        </section>
        <section class="account__statistic"></section>
        <section class="account__favorites-films" v-if="isShowFavoritesFilms">
            <FavoriteFilms />
        </section>
    </div>
</template>

<script>
import FavoriteFilms from '@/components/FavoriteFilms'

import { mapGetters } from 'vuex'

export default {
    name: 'Account',
    components: {
        FavoriteFilms
    },
    data() {
        return {
            isShowFavoritesFilms: false
        }
    },
    computed: {
        ...mapGetters( [ 'getUser', 'getAVATAR_URL' ] ),
        userAvatar() {
            return `${ this.getAVATAR_URL }${ _.get( this.getUser, 'avatar.tmdb.avatar_path', '' ) }`
        },
        userNoAvatar() {
            return _.get( this.getUser, 'username' ).split( '' )[ 0 ]
        }
    },
    methods: {
        toFavoriteFilms() {
            this.isShowFavoritesFilms = true
            this.$router.push( { hash: 'favorites' } )
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.account {
  &__header {
    background: $account-header;
    height: 15rem;
  }

  &__content {
    display: flex;
    justify-content: center;
    padding: 50px;
    max-width: 1400px;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: white;
    font-size: 32px;
  }

  &__rating-circle {
    width: 50px;
    height: 50px;
    background-color: #3e3e3e;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 18px;

    &:after {
      content: '';
      position: absolute;
      top: 2px;
      right: 7px;
      bottom: -12px;
      left: 2.5px;
      display: inline-block;
      width: 3.5em;
      height: 3.5em;
      border-radius: 50%;
      vertical-align: middle;
      border: 0.3em solid orange;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    padding-right: 50px;
    border-right: 1px solid #fff;
  }

  &__avatar {
    background: $background-avatar;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    margin-right: 12px;

    span {
      display: inline-flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      font-size: 4em;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &__menu {
    background-color: white;
  }

  &__favorites-films {
    background: white;
  }

}
</style>