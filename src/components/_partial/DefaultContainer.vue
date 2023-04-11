<template>
  <div class="main" ref="page">
    <div class="main-header">
      <MainHeader />
    </div>
    <main class="main-content">
      <router-view :key="$route.path"></router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import AppFooter from '@/components/AppFooter'



export default {
  name: 'DefaultContainer',
  data() {
    return {}
  },
  components: {
    MainHeader,
    AppFooter
  }

}
</script>

<style scoped>
.main-header {
    position: fixed;
    width: 100%;
    z-index: 9999;
}
</style>