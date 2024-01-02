<template>
    <h2 class="mb-10 text-4xl" v-if="showSearchResults" data-test="search-results">
        Søkeresultater for '{{ searchStore.searchPart }}'
    </h2>
</template>

<script setup lang="ts">
/**
 * Component for displaying search results in the feed top section.
 */

const showSearchResults = computed(() => {
    /**
     * Computed property that determines whether to show the TEXT of the search query.
     * It returns true if the searchPart is not null, otherwise false.
     *
     * @returns {boolean} - True if search results should be shown, false otherwise.
     */
    if (searchStore.searchPart !== null) {
        return true;
    }
});

const searchStore = useSearchStore();
</script>

<style scoped></style>
