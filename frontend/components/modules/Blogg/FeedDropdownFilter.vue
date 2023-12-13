<template>
    <div data-test="filter_tags">
        <FilterDropdownTags @output="action" :options="tags" />
    </div>
</template>

<script setup lang="ts">

const searchStore = useSearchStore()
const paginationStore = usePaginationStore()

/** State that holds all the tags - fetched */
const tags = ref(<string[]>[])

/**
 * This function is called whenever the tagFilter FilterBox is updated. This
 * in turn calls the ConstructUrl computed property, by changing one of the values inside.
 * 
 * @param items The chosen items from filterbox.
 */
const action = async (items: any) => {
    searchStore.tagFilterPart = items

    /** 
     * Create a new url with tag paramaters
     */
    paginationStore.activeFetchURL = constructURL(urls.baseApiURL)

    /** Fetches all posts again based on new url made w */
    await getPostMultipleSnippet(paginationStore.activeFetchURL)
}

onMounted(async () => {
    /** Fetches all tags */
    const response = await getAllTags()

    if (response) {
            for (let tag of response) {
                tags.value.push(tag.name)
        }

    }
})

</script>

<style scoped></style>