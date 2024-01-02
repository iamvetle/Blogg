<template>
	<div
		class="mt-8 max-w-[1100px] w-full mx-auto px-6 grid grid-cols-10 gap-28"
	>
		<div data-test="everything" class="col-span-6 mx-auto w-full">
			<!-- 
				* No api fetching is here.
				* No url "manipulation" (local, or api) changing either.
			-->
			<FeedMain />
		</div>
		<div id="feed-sidebar" class="col-span-4 mx-auto w-full">
			<FeedSidebar />
		</div>
	</div>
	<!-- fallback -->
</template>

<script setup lang="ts">
// const postStore = usePostStore();
// const searchStore = useSearchStore();
// const paginationStore = usePaginationStore();

definePageMeta({
	layout: "feed-layout",
});

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
 * ! no store is "reset now"
 */
// onUnmounted(() => {
// 	/** This makes sure that all the filters and the search is removed*/
// 	searchStore.resetStore();

// 	/** So that all posts are "removed" and forces a refetch */
// 	postStore.resetStore();

// 	/** So that the navigation bar / paginator at the button restarts, and starts at one  */
// 	paginationStore.resetStore();
// });
</script>

<style scoped></style>
