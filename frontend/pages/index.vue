<template>
	<div id="site-wrapper" v-if="store.isAuthenticated" class="mt-8">
		<div v-if="(store.posts) && (store.personalUser)"
			class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<ListArticles v-if="store.posts" class="col-span-6 mx-auto" />

			<div class="col-span-4 mx-auto">

				<base-dropdown-menu v-if="store.idArrayOfSavedPosts" class="mb-4">

					<template #filter>
						<h3 class="">Tags</h3>
						<FilterBox :list-of-options="tagOptions" class="mb-2" @output="action" />

						<!-- <FilterTool date-test="filter-tool" /> -->


					</template>

				</base-dropdown-menu>

				<ListArticlesSidebar v-if="store.personalUser" />
			</div>
		</div>
	</div>
	<div v-if="store.isAuthenticated === false">
		<Wait />
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';
import { useSearchStore } from '~/store/searchStore';

const store = useGeneralStore()
const searchStore = useSearchStore()


/**
 * Changes the layout based on whether the user is authenticated or not
 * 
 * @todo endre denne til en function med computed istedenfor (?)
 */
watchEffect(() => {
	if (store.isAuthenticated === true) {
		setPageLayout("feed-layout");
	}
	if (store.isAuthenticated === false) {
		setPageLayout("blank");
	}
})

onMounted(async () => {
	/**
	* Fetches the profile information of the logged-in user
	*/
	await getLoggedInUserProfile()

	/**
	 * Fetches all posts in snippets (not full content length)
	   */
	await getPostMultipleSnippet()
	console.log(store.posts) // print to self


	/** Fetches all possible tags
  * @var store.allTags - assigns the response data here
	*/
	await getAllTags()
})


const tagOptions = computed(() => {
	let temp = []

	if (store.allTags != null) {
		for (let i of store.allTags.results) {
			temp.push(i.name)
		}
	}
	return temp

})


const action = (items: any) => {
	searchStore.tagFilterPart = items
}

const constructURL = computed(() => {
	// Construct the URL based on the state
	let url = 'http://localhost:8888/api/search/';

	let params = [];

	if (searchStore.searchPart) {
		console.log(searchStore.searchPart)
		params.push(`search=${searchStore.searchPart}`);
	}
	if (searchStore.tagFilterPart && searchStore.tagFilterPart.length > 0) {
		for (let tag of searchStore.tagFilterPart) {
			params.push(`tags=${tag}`)
		}
	}
	if (params.length > 0) {
		url += `?${params.join('&')}`;
	}
	console.log(url)

	return url
})
watchEffect(async () => {
	let url = constructURL.value

	searchStore.baseSearchURL = url

	console.log(searchStore.baseSearchURL)

	await searchRequest()
})


onDeactivated(() => {
})

onUnmounted(() => {
	searchStore.tagFilterPart = null
	searchStore.searchPart = null
})



</script>

<style></style>