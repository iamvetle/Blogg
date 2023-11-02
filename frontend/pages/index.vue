<template>
	<div id="site-wrapper" v-if="generalStore.isAuthenticated" class="mt-8">
		<div v-if="(postStore.posts) && (loggedInUserStore.loggedInUserProfile)"
			class="max-w-[1100px] w-full h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<div class="col-span-6 mx-auto w-full">
				<h2 class="mb-10 text-4xl" v-if="searchStore.searchPart">Søkeresultater for '{{ searchStore.searchPart }}'
				</h2>
				<ListArticles v-if="postStore.posts" class="w-full" />
			</div>
			<div class="col-span-4 mx-auto w-full">
				<div id="dropdown-menu" v-if="loggedInUserStore.idArrayOfSavedPosts"
					class="mb-4 bg-primary rounded-lg text-onPrimary">
					<span class="mb-2 w-full flex items-center text-center justify-center">
						<button
							class="text-lg hover:text-primaryFixedDim rounded-md px-1 py-1 text-onPrimary flex text-center items-center justify-center"
							@click="changeDropdown">
							Filter posts
						</button>
					</span>
					<div>
						<!-- The filter dropdown compontent-->
						<KeepAlive>
							<component :is="dropdown" id="dropdown-content" :list-of-options="tagOptions"
								class="w-full mb-2 px-2 py-1" @output="action" />
						</KeepAlive>
					</div>
				</div>
				<!-- This lists the (saved)articles in thes sidebar -->
				<ListArticlesSidebar class="w-full" v-if="loggedInUserStore.loggedInUserProfile" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore'
import { useGeneralStore } from '~/store/generalStore';
import { useSearchStore } from '~/store/searchStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';

const postStore = usePostStore()
const generalStore = useGeneralStore()
// const paginationStore = usePaginationStore()
const searchStore = useSearchStore()
const loggedInUserStore = useLoggedInUserStore()
const paginationStore = usePaginationStore()

definePageMeta({
	layout: "feed-layout"
})

/**
 * Middleware in the background makes sure that only authenticated users can access this page,
 * or else they are redirected to the /wait page
 */

/**
 * This changes the layout the pages uses dynamically, based on wait.vue or not.
 */

/**
 * Toggles between showing the filterbox component and not.
 * 
 * The 'component' together with 'KeepAlive' caches the component state 
 * so that what is 'checked' with checkboxes doesnt dissapear when the tab is toggled
 */
const dropdown = shallowRef<any>(false)

const f = resolveComponent('FilterBox')

const changeDropdown = () => {
	if (dropdown.value == f) {
		dropdown.value = false
	} else {
		dropdown.value = f
	}
}



/**
 * NEW: I removed the IF statements that was meant to check whether it was already information/posts there already,
 * but it said it was when it wasnt sometimes, which was very weird, so I removed it on all->
 */

/**
 * All of the data that is needed from the api endpoint is fetched here.
 */
onMounted(async () => {

	if (checkLocalInfo() == null) {
		return null
	}
	/**
	* Fetches the profile information of the logged-in user
	*/
	await getLoggedInUserProfile()
	/**
	 * Fetches all posts in snippets (not full content length)
	   */
	await getPostMultipleSnippet()


	/** 
	 * Fetches all possible tags. And then assigns all of them in a variable in the post store
	*/

	await getAllTags()

})

/**
 * Formats the ugly array-object for keeping the tags, and creates an 
 * array with only the name of the tags in a prettier format, which it returns.
 * 
 * It strictly doesnt *need* to be computed
 */
const tagOptions = computed(() => {
	let temp = []

	if (postStore.allTags != null) {
		for (let i of postStore.allTags) {
			temp.push(i.name)
		}
	}
	return temp

})

/**
 * This function is called whenever the tagFilter FilterBox is updated. This
 * in turn calls the ConstructUrl computed property, by changing one of the values inside.
 * 
 * @param items The chosen items from filterbox.
 */
const action = async (items: any) => {
	searchStore.tagFilterPart = items
	constructURL()
	await getPostMultipleSnippet()

}

/**
 * Makes sure that the variables tracking the information for which checkboxes are checked are emptied when a refresh happens,
 * or an unmount.
 * 
 * This is important because if that does not happen, the checkboxes status might be restarted, but not the state of them,
 * and ends them up not being syncronous.
 */

onBeforeUnmount(() => {
	console.log("Index is unmounted")

	searchStore.$reset
	postStore.$reset

	paginationStore.$reset

})



</script>

<style></style>