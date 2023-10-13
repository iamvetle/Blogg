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
					<span class="text-sm text-gray-700" v-if="store.number_of_posts_count">
						A total of
						<span class="font-medium">
							{{ store.number_of_posts_count }}
						</span>

						<span class="font-medium">
							posts
						</span>
					</span>
				</div>
				<div>
					<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
						<div class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 z-10 bg-primary text-onPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							{{ store.current_page }}
						</div>


						<span v-if="under_last_page"
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 ">...</span>

						<span v-if="store.current_page != store.total_pages_count"
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{{
								store.total_pages_count }}</span>


						<div class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							@click="click_next_page">
							<span class="sr-only">Next</span>
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

import { useGeneralStore } from '~/store/generalStore'

const store = useGeneralStore()
const under_last_page = ref(true)

watchEffect(() => {
	if (store.current_page + 1 >= store.total_pages_count) {
		under_last_page.value = false
	}
	if (store.current_page + 1 < store.total_pages_count) {
		under_last_page.value = true
	}
})


const click_next_page = async () => {

	if (store.next_page_link != null) {
		store.baseFeedURL = store.next_page_link

		await fetchPostSnippets()
	} else {
		console.log("cannot go any further")
	}
}

const click_previous_page = async () => {

	if (store.previous_page_link != null) {
		store.baseFeedURL = store.previous_page_link

		await fetchPostSnippets()
	} else {
		console.log("cannot go any more back")
	}
}

// FIX: later
// const click_last_page = async () => {
// 	store.baseSearchURL = store.last_page_link

// 	const new_page_link = `http://localhost:8888/api/search/?page=${store.total_pages_count}`

// 	if (new_page_link != "") {
// 		store.baseSearchURL = store.last_page_link

// 		console.log(store.baseSearchURL)

// 		await fetchPostSnippets()
// 	} else {
// 		console.log("cannot go any further back")
// 	}
// }
// links

</script>

<style scoped></style>