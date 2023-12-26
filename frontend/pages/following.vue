<template>
    <div data-test="else_slum">
        <FeedAll/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
	layout:"feed-layout"
})

const postStore = usePostStore();
const searchStore = useSearchStore();
const paginationStore = usePaginationStore();

/**
 * This component displays either the..
 *
 * **main** posts feed or the **following** feed.
 *
 * TODO - Implement a fallback through the suspense element
 */

/**
 * ? Maybe I should have this in the components that actually use the functions and then
 * ? populare the store instead
 */
onUnmounted(() => {
	/** This makes sure that all the filters and the search is removed*/
	searchStore.resetStore();

	/** So that all posts are "removed" and forces a refetch */
	postStore.resetStore();

	/** So that the navigation bar / paginator at the button restarts, and starts at one  */
	paginationStore.resetStore();
});

// const router = useRouter()
const route = useRoute();

const urlRightNow = computed(() => route.fullPath);

watch(urlRightNow, (newUrl) => {
	console.info(`The page url is ${newUrl}`, {
		immediate:true
	})
});

/** Takes the url queries and puts them in the correct stores (paginationStore, searchStore) */
useDeConstructURL()

/** */
onBeforeMount(() => useWatchUrl())

</script>

<style scoped>

</style>