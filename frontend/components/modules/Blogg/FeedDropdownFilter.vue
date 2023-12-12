<template>
    <div>
        <FilterDropdownTags @output="action" />
    </div>
</template>

<script setup lang="ts">

const searchStore = useSearchStore()
const paginationStore = usePaginationStore()

/**
 * This function is called whenever the tagFilter FilterBox is updated. This
 * in turn calls the ConstructUrl computed property, by changing one of the values inside.
 * 
 * @param items The chosen items from filterbox.
 */
const action = async (items: any) => {
    searchStore.tagFilterPart = items

    /** 
     * ? Inside of the function instead?
     */
    paginationStore.activeFetchURL = constructURL("http://localhost:8888/api/feed/")

    await getPostMultipleSnippet(paginationStore.activeFetchURL)
}

</script>

<style scoped></style>