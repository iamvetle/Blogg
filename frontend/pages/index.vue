<template>
	<div
		class="mt-8 max-w-[1100px] w-full mx-auto px-6 grid grid-cols-10 gap-28"
	>
		<div data-test="everything" class="col-span-6 mx-auto w-full">
		{{ generalStore.activeApiURL }}
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
</template>

<script setup lang="ts">
const postStore = usePostStore();
// const searchStore = useSearchStore();
const paginationStore = usePaginationStore();
const generalStore = useGeneralStore()

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


watchEffect(async () => {
	paginationStore.activeFetchURL = generalStore.activeApiURL
	await postStore.fetchFeedPreviewPosts();	
})

// onBeforeRouteLeave(() => {
// 	const router = useRouter()

// 	router.push({ path: router.currentRoute.value.path })
// })


/**
 * * All posts are fetched when the page is access for the first time
 */
// onBeforeMount( async () => {
// 	await postStore.fetchFeedPreviewPosts();	
// })

</script>

<style scoped></style>
