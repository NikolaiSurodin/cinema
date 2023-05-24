<template>
  <div class="main">
    <MainHeader/>
    <main class="main-content">
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
  }

}
</script>

<style lang="scss">
.main-content {
  min-height: calc( 100vh - 184px );
}
</style>