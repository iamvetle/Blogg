<template>
	<div data-test="feed_pagination" class="w-full">
		<UPagination v-model="paginationStore.active_page" :total="totalPages" :page-count="5">
		</UPagination>
	</div>
</template>

<script setup lang="ts">
/** States related to the pagination is here */
const paginationStore = usePaginationStore();

const totalPages = computed(() => paginationStore.total_number_of_posts);

/**
 * ! The pagination class I just took returns "count" but it is just *one* number
 * ! above the latest id - so I cant make calculations out of thats
 * ! have to create custom pagination so that can work properly
 * ! also have to fix the relation it has with fix pagination
 * ! also its realtion to tags and navbar
 */

/**
 * The active page (number)
 * It changes based on UPagination
 */
const page = ref(1);

/** Fetches new data every time the url changes */
// watchEffect(async () => {
// 	let feedPage = urls.api.posts.feedAtPage(page.value);
// 	paginationStore.activeFetchURL = feedPage;
// 	/**
// 	 * ? should I have this somewhere else?
// 	 */
// 	console.info("The url changed. Is going to fetch posts now")
// 	await getPostMultipleSnippet(paginationStore.activeFetchURL);
// });

/**
 * When the 'next page' icon ( > ) is clicked new data is fetched
 * based on the next_page variable in the pagination store
 */
</script>

<style scoped></style>
