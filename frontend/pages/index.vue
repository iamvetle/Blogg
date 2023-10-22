<template>
	<div id="site-wrapper" v-if="store.isAuthenticated" class="mt-8">
		<div v-if="(store.posts) && (store.personalUser)" class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<ListArticles v-if="store.posts" class="col-span-6 mx-auto" />
			
			
			<div class="col-span-4 mx-auto">

				<base-dropdown-menu  v-if="store.idArrayOfSavedPosts" class="mb-4">

					<template #filter>

						<FilterTool 
						date-test="filter-tool"
						/>

					</template>

				</base-dropdown-menu>

				<ListArticlesSidebar v-if="store.personalUser"/>
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

const store = useGeneralStore()

console.log(store.isAuthenticated); // print to self
/**
 * Changes the layout based on whether the user is authenticated or not
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
	 * Fetches the profile information of the logged in user
	 * @var store.personalUser - assigns the response data here
	 */
	await getLoggedInUserProfile()
})

onMounted(async () => {
	/**
	 * Fetches all posts in snippets (not full content length)
	 * @var store.posts - assigns the response data here
	 */
	await getPostMultipleSnippet()
	console.log(store.posts)
})


onMounted(async () => {
	/**
 	* Fetches all possible tags
	* @var store.allTags - assigns the response data here
 	*/
	await getAllTags()
})

</script>

<style></style>