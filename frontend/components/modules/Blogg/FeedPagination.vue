<template>
	<div>
		<div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div class="flex flex-1 justify-between sm:hidden">
				<a href="#"
					class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
				<a href="#"
					class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
			</div>
			<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<span class="text-sm text-gray-700" v-if="paginationStore.number_of_posts">
						A total of
						<span class="font-medium">
							{{ paginationStore.number_of_posts }}
						</span>

						<span class="font-medium">
							posts
						</span>
					</span>
				</div>
				<div>
					<nav v-if="paginationStore.number_of_posts > 10" data-test="post-navigation" class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
						
						<div id="back-icon" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							@click="click_previous_page">
							
							<span class="sr-only">Previous</span>
							
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd"
									d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
									clip-rule="evenodd" />
							</svg>
						</div>
						<!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->

						<div id="current-page"
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 z-10 bg-primary text-onPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
							{{ paginationStore.current_page_number }}
						</div>


						<span id="dott-dott-dott" v-if="under_last_page"
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 ">...</span>

						<span id="last-page" v-if="paginationStore.current_page_number != paginationStore.all_pages_count"
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{{
								paginationStore.all_pages_count }}</span>


						<div id="forward-icon" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							@click="click_next_page">

							<span class="sr-only">
								Next
							</span>
							
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clip-rule="evenodd" />
							</svg>
						</div>

					</nav>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { usePaginationStore } from '~/store/paginationStore';

const paginationStore = usePaginationStore()

const under_last_page = ref(true)

watchEffect(() => {
	if (paginationStore.current_page_number >= paginationStore.all_pages_count - 1) {
		under_last_page.value = false
	}
	else {
		under_last_page.value = true
	}
})


/**
 * When the 'next page' icon ( > ) is clicked new data is fetched
 * based on the next_page variable in the pagination store
 */
const click_next_page = async () => {

	if (paginationStore.next_page != null) {

		paginationStore.activeFetchURL = paginationStore.next_page


		await getPostMultipleSnippet(paginationStore.activeFetchURL)
	} else {
		console.log("cannot go any further")
	}
}

/**
 * When the 'previous page' icon ( < ) is clicked new data is fetched
 * based on the next_page variable in the pagination store
 */
const click_previous_page = async () => {

	if (paginationStore.previous_page != null) {
		paginationStore.activeFetchURL = paginationStore.previous_page

		await getPostMultipleSnippet(paginationStore.activeFetchURL)
	} else {
		console.log("cannot go any more back")
	}
}

</script>

<style scoped></style>