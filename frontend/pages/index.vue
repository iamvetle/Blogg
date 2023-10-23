<template>
	<div id="site-wrapper" v-if="store.isAuthenticated" class="mt-8">
		<div v-if="(store.posts) && (store.personalUser)"
			class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<ListArticles v-if="store.posts" class="col-span-6 mx-auto" />
			{{ searchStore.filterPart }}


			<div class="col-span-4 mx-auto">

				<base-dropdown-menu v-if="store.idArrayOfSavedPosts" class="mb-4">
					<!-- <base-dropdown-menu v-if="false" class="mb-4"> -->


					<template #filter>

						<FilterBox :list-of-options="tagOptions" class="bg-red-500 text-black mb-2" @output="action" />

						<!-- <FilterTool date-test="filter-tool" /> -->
						<div>{{ searchStore.filterPart }}s</div>
						<div>{{ searchStore.searchPart }}s</div>



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

// watch(
// 	() => searchStore.baseSearchURL,
// 	async (newUrl, oldUrl) => {
// 		// Trigger data fetching here
// 		await searchRequest();  // Replace with your actual fetching function
// 	}
// );




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
	searchStore.filterPart = items

	alert(constructURL())

}

const constructURL = () => {
	// Construct the URL based on the state
	let url = '/api/posts';
	let params = [];
	if (searchStore.searchPart) {
		params.push(`q=${searchStore.searchPart}`);
	}
	if (searchStore.filterPart.length > 0) {
		for (let tag of searchStore.filterPart) {
			params.push(`tags=${tag}`)
		}
	}
	if (params.length > 0) {
		url += `?${params.join('&')}`;
	}

	return url
}

onDeactivated(() => {
	searchStore.filterPart = null
	searchStore.searchPart = null
})

onUnmounted(() => {
	searchStore.filterPart = null
	searchStore.searchPart = null
})



</script>

<style></style>