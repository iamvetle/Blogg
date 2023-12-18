<template>
    <div>
        <h2 class="mb-10 text-4xl" v-if="searchStore.searchPart" data-test="search-results">
            Søkeresultater for '{{ searchStore.searchPart }}'
        </h2>
    </div>
</template>

<script setup lang="ts">

const searchStore = useSearchStore()

</script>

<style scoped></style>