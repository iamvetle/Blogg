<template>
	<div data-test="feed_pagination" class="w-full">
		<UPagination v-model="paginationStore.active_page" :total="totalPages" :page-count="5">
		</UPagination>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const paginationStore = usePaginationStore();

const totalPages = computed(() => paginationStore.total_number_of_posts);

// Sync the reactive reference number to the URL query parameter
watchEffect(() => {
	const pageQueryParam = route.query.page;
	const currentPage = parseInt(pageQueryParam as string);
	if (!isNaN(currentPage)) {
		paginationStore.active_page = currentPage;
	}
});

// Update the URL query parameter when the reactive reference number changes
watch(() => paginationStore.active_page, (newPage) => {
	router.push({ query: { page: newPage.toString() } });
});

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
