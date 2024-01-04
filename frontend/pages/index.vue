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
</template>

<script setup lang="ts">
const postStore = usePostStore();
// const searchStore = useSearchStore();
const paginationStore = usePaginationStore();
const generalStore = useGeneralStore();

definePageMeta({
	layout: "feed-layout",
});

useWatchStore();

await postStore.fetchFeedPreviewPosts();









/**
 * This component displays either the..
 *
 * **main** posts feed or the **following** feed.
 *
 * TODO - Implement a fallback through the suspense element
 */


/** Takes whatever the "localurl is" and places it in the paginationStore fetchurl */
// watch(() => paginationStore.activeFetchURL, async () => {
// 	paginationStore.activeFetchURL = generalStore.activeApiURL;
// 	await postStore.fetchFeedPreviewPosts();
// }
// );

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

// Notes of "watch"

/**
 * The watch function in Vue.js allows you to observe changes on a source and react to those changes. It takes three arguments: the source, the callback, and an optional options object.

Here's a quick summary of the options that watch accepts:

deep: If true, the watcher will also detect nested property changes inside Objects. Default is false.

immediate: If true, the callback will be called immediately after the watcher is created, before any changes to the source. Default is false.

flush: This option determines when the watcher's callback should be run in relation to Vue's component lifecycle and the DOM rendering process. It can have one of three values: 'pre', 'post', or 'sync'.

'pre': The callback is run before the DOM is updated, but after the state change. This is the default value. It's similar to the updated lifecycle hook in Vue 2.
'post': The callback is run after the DOM is updated. It's similar to Vue 2's nextTick or Vue 3's onUpdated lifecycle hook.
'sync': The callback is run synchronously immediately after the reactive dependency changes. This can lead to more frequent updates and should be used sparingly.
The watch function is not tied to the component's lifecycle in the same way that lifecycle hooks are. It is used to react to changes in reactive data sources, and can be triggered at any time when their dependencies change, not just during specific lifecycle stages.

However, the flush option can control when the watch callback runs in relation to the component lifecycle. For example, if flush is set to 'post', the callback will run after the DOM has been updated, similar to the onUpdated lifecycle hook.
 */
</script>

<style scoped></style>
