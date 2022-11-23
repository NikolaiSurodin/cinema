<template>
    <div class="filter-settings">
        <GenresList />
    </div>
</template>

<script>
import GenresList from '@/components/GenresList'

export default {
    name: 'FilterSettings',
    components: {
        GenresList
    }
}
</script>

<style scoped>

</style>