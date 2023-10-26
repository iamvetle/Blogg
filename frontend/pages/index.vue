<template>
	<div id="site-wrapper" v-if="generalStore.isAuthenticated" class="mt-8">
		<div v-if="(postStore.posts) && (loggedInUserStore.loggedInUserProfile)"
			class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<div class="col-span-6 mx-auto w-full" >
				<h2 class="mb-10 text-4xl" v-if="searchStore.searchPart != ''">Søkeresultater for '{{ searchStore.searchPart }}' </h2>
				<ListArticles v-if="postStore.posts" class="w-full"/>
			</div>
			<div class="col-span-4 mx-auto">
					<div id="dropdown-menu" v-if="loggedInUserStore.idArrayOfSavedPosts" class="mb-4 bg-primary rounded-lg text-onPrimary">
						<span class="mb-2 w-full flex items-center text-center justify-center">
								<button
									class="hover:text-primaryFixedDim rounded-md px-1 py-1 text-onPrimary flex text-center items-center justify-center"
									@click="changeDropdown">
									Filter posts
								</button>
						</span>
						<KeepAlive>
							<component :is="dropdown" id="dropdown-content" :list-of-options="tagOptions" class="mb-2" @output="action" />
						</KeepAlive>
					</div>
				<ListArticlesSidebar v-if="loggedInUserStore.loggedInUserProfile" />
			</div>
		</div>
	</div>
	<div v-if="generalStore.isAuthenticated === false">
		<Wait />


	</div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore'
import { useGeneralStore } from '~/store/generalStore';
import { useSearchStore } from '~/store/searchStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';
import { FilterBox } from '#components';

const postStore = usePostStore()
const generalStore = useGeneralStore()
const paginationStore = usePaginationStore()
const searchStore = useSearchStore()
const loggedInUserStore = useLoggedInUserStore()


/**
 * Changes the layout based on whether the user is authenticated or not
 * 
 * @todo endre denne til en function med computed istedenfor (?)
 */
const dynamicLayout = computed(() => {
	if (generalStore.isAuthenticated === true) {
		return "feed-layout"
	}
	if (generalStore.isAuthenticated === false) {
		return "blank"
	}
})

/**
 * Toggles between showing the filterbox component and not.
 * 
 * The 'component' together with 'KeepAlive' caches the component state 
 * so that what is 'checked' with checkboxes doesnt dissapear when the tab is toggled
 */
const dropdown = shallowRef<any>(false)

const changeDropdown = () => {
	if (dropdown.value == FilterBox) {
		dropdown.value = false
	} else {
		dropdown.value = FilterBox
	}
}


/**
 * All of the data that is needed from the api endpoint is fetched here.
 */
onMounted(async () => {
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
const action = (items: any) => {
	searchStore.tagFilterPart = items
}

/**
 * Constructs a new URL that we want to fetch post data from, that is based on the correct
 * query parameters. The query specifies and filters through search, tags, categories and more.
 * 
 * This computed property is updated dynamically whenever a value inside changes. Which is either
 * the 'searchPart', or the 'tagFilterPart'
 * 
 * @todo Find out whether I should move this to a pluging or composable or someting
 */
const constructURL = computed(() => {
	// Construct the URL based on the state
	let url = postStore.baseFetchURL

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

/**
 * Re-fetches the post data if the url has changed.
 * 
 * Fetches new data whenever a new search is made, or whenever a new filtercheckbox is checked
 */

watchEffect(async () => {
	let url = constructURL.value

	paginationStore.activeFetchURL = url

	await getPostMultipleSnippet()
})


/**
 * Makes sure that the variables tracking the information for which checkboxes are checked are emptied when a refresh happens,
 * or an unmount.
 * 
 * This is important because if that does not happen, the checkboxes status might be restarted, but not the state of them,
 * and ends them up not being syncronous.
 */

onUnmounted(() => {
	onResetStore()
})

setPageLayout(dynamicLayout.value)

</script>

<style></style>