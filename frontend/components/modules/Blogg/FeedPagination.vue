<template>
	<div data-test="feed_pagination" class="w-full">
		<UPagination class="bg-red-800" v-model="page" :total="totalPages" :page-count="5">

		</UPagination>	
	</div>
</template>

<script setup lang="ts">

/** States related to the pagination is here */
const paginationStore = usePaginationStore();

const totalPages = ref(0)

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
const page = ref(1)

watchEffect( async () => {
	totalPages.value = paginationStore.totalCountOfPages
	let feedPage = urls.api.posts.feedAtPage(page.value)
	paginationStore.activeFetchURL = feedPage
	/**
	 * ? should I have this somewhere else?
	 */
	await getPostMultipleSnippet(paginationStore.activeFetchURL)
})

/**
 * When the 'next page' icon ( > ) is clicked new data is fetched
 * based on the next_page variable in the pagination store
 */
</script>

<style scoped></style>
