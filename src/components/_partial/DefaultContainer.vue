<template>
  <div class="main">
    <MainHeader/>
    <main class="main-content" @scroll="handleScroll">
      <router-view :key="$route.path"></router-view>
    </main>
    <AppFooter/>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import AppFooter from '@/components/AppFooter'


export default {
  name: 'DefaultContainer',
  data() {
    return {
      prevScrollPos: 0
    }
  },
  components: {
    MainHeader,
    AppFooter
  },
  methods: {
    handleScroll() {
      console.log(123)
      // const scrollPos = this.$refs.scrollContainer.scrollTop;
      //
      // if ( scrollPos > this.prevScrollPos ) {
      //   console.log( 'Scrolling down' );
      // } else if ( scrollPos < this.prevScrollPos ) {
      //   console.log( 'Scrolling up' );
      // }
      //
      // this.prevScrollPos = scrollPos;
    }
  }

}
</script>

<style lang="scss">

.main-header {
  //position: absolute;
  //top: $header-height;
}
.main-content {
  height: 100%;
}
</style>