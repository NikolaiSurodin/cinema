<template>
  <div id="app" @scroll="handleScroll">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
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
@import 'assets/styles.scss';
@import 'assets/global.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
