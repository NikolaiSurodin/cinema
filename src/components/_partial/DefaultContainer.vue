<template>
<div class="main">
    <MainHeader />
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
    components:{
        MainHeader,
        AppFooter
    }
}
</script>

<style scoped>

</style>