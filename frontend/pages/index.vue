<template>
	<div id="site-wrapper" v-if="store.isAuthenticated" class="mt-8">
		<div v-if="(store.posts) && (store.personalUser)"
			class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<ListArticles v-if="store.posts" class="col-span-6 mx-auto" />


			<div class="col-span-4 mx-auto">

				<base-dropdown-menu v-if="store.idArrayOfSavedPosts" class="mb-4">  temp disabled
				<!-- <base-dropdown-menu v-if="false" class="mb-4"> -->


				<template #filter>

						<FilterBox :list-of-options="listName" class="bg-red-500 text-black mb-2" 
						@theSelected="action"
						/>

						<!-- <FilterTool date-test="filter-tool" /> -->
						<div>{{ it }}</div>

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
import FilterTool from '~/components/utils/FilterTool.vue';
import { useSearchStore } from '~/store/searchStore';

const store = useGeneralStore()
const searchStore = useSearchStore()

const listName = computed(() => {
	let temp = []

	if (store.allTags != null) {
		for (let i of store.allTags.results) {
			temp.push(i.name)
		}
	}
	return temp

})

const it = ref<any>(null)

const action = (items:any) => {
	it.value = items 
}

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

watch(
	() => searchStore.baseSearchURL,
	async (newUrl, oldUrl) => {
		// Trigger data fetching here
		await searchRequest();  // Replace with your actual fetching function
	}
);

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

</script>

<style></style>