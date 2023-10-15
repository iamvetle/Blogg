<template>
	<div id="site-wrapper" v-if="store.isAuthenticated" class="mt-8">
		<div v-if="store.posts && store.personalUser" class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<ListArticles class="col-span-6 mx-auto" />
			
			
			<div class="col-span-4 mx-auto">

				<base-dropdown-menu  v-if="store.idArrayOfSavedPosts" class="mb-4">

					<template #filter>

						<FilterTool />

					</template>

				</base-dropdown-menu>

				<ListArticlesSidebar/>
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
 * Updates the page layout to a plain one if you are 'unauthenticated'. 
 * The function 'watches' the 'global' variable that says if you are 'unauthenticated'.
 * or the other way around
 */

watchEffect(() => {
	if (store.isAuthenticated === true) {
		setPageLayout("feed-layout");
	}
	if (store.isAuthenticated === false) {
		setPageLayout("blank");
	}
})

onBeforeMount(async () => {
	await getLoggedInUserProfile()
})

onBeforeMount(async () => {
	await getPostMultipleSnippet()
	console.log(store.posts)
})

/**
 * Fetches all possible tags
 */
onBeforeMount(async () => {
	await getAllTags()
})



</script>

<style></style>