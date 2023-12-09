<template>
    <div>
        <span class="mb-2 w-full flex items-center text-center justify-center">
            <button data-test="dropdown-button"
                class="w-full h-full text-lg hover:text-primaryFixedDim rounded-md px-1 py-1 text-onPrimary flex text-center items-center justify-center"
                @click="changeDropdown()"
                >
                Filter posts
            </button>
        </span>
        <div v-show="dropdown" class="px-2 py-2" data-test="filter-component" >
            <!-- The filter dropdown compontent-->
            <KeepAlive>
                <component :is="dropdown" :list-of-options="tagOptions"
                    class="w-full mb-2 px-2 py-1" @output="action" />
            </KeepAlive>
        </div>
    </div>
</template>

<script setup lang="ts">

const searchStore = useSearchStore()
const postStore = usePostStore()
const paginationStore = usePaginationStore()

/**
 * Formats the ugly array-object for keeping the tags, and creates an 
 * array with only the name of the tags in a prettier format, which it returns.
 * 
 * It strictly doesnt *need* to be computed
 */
const tagOptions = computed(() => {
    let temp = []

    if (postStore.allTags != null) {
        for (let i of postStore.allTags) {
            temp.push(i)
        }
    }
    return temp

})

/**
 * For the dynamic component! 
 * 
 * Toggles between showing the filterbox component and not.
 * 
 * The 'component' together with 'KeepAlive' caches the component state 
 * so that what is 'checked' with checkboxes doesnt dissapear when the tab is toggled
 */
const dropdown = shallowRef<any>(false)
const f = resolveComponent('FilterBox')
const changeDropdown = () => {
    if (dropdown.value == f) {
        dropdown.value = false
    } else {
        dropdown.value = f
    }
}

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