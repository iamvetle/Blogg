<template>
	<div v-if="generalStore.isAuthenticated" class="mt-8">
		<div v-if="(postStore.posts) && (loggedInUserStore.loggedInUserProfile)"
			class="max-w-[1100px] w-full mx-auto px-6 grid grid-cols-10 gap-28">
			<div data-test="everything" class="col-span-6 mx-auto w-full">

				<h2 class="mb-10 text-4xl" v-if="searchStore.searchPart">
					Søkeresultater for '{{ searchStore.searchPart }}'
				</h2>

				<FeedTopChoice
				:followingSelected="selected"
				/>
				<p class="text-lg"
					v-if="(num_of_following === 0) && (selected) && (postStore.posts.results.length == 0)">You are
					not
					following anyone.</p>
				<p class="text-lg"
					v-if="(postStore.posts?.results?.length === 0) && (selected) && (num_of_following > 0)">No
					posts are published.</p>
				<FeedListArticles v-if="postStore.posts.results" class="w-full mt-12" />
			</div>
			<div class="col-span-4 mx-auto w-full">
				<div id="dropdown-filter" v-if="postStore.allTags && !selected"
					class="mb-4 bg-primary rounded-lg text-onPrimary">
					<FeedDropdownFilter/>
				</div>
				<!-- This lists the (saved)articles in thes sidebar -->
				<FeedListArticlesSidebar class="w-full" v-if="loggedInUserStore.loggedInUserProfile" />
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

// Importing all stores

const postStore = usePostStore()
const generalStore = useGeneralStore()
const searchStore = useSearchStore()
const loggedInUserStore = useLoggedInUserStore()
const paginationStore = usePaginationStore()

definePageMeta({
	layout: "feed-layout"
})

// Declerations

/** 
 * FEED or FOLLOWING button selected display 
 * 
 * When the buttons are clicked this changes (also by navbar search)
 * 
 * If the active url is the following url, this turns true, otherwise, it is false
 */
const selected = computed(() => (paginationStore.activeFetchURL === "http://localhost:8888/api/feed/following/"))


/**
 * NEW: I removed the IF statements that was meant to check whether it was already information/posts there already,
 * but it said it was when it wasnt sometimes, which was very weird, so I removed it on all->
 */

/**
 * All of the data that is needed from the api endpoint is fetched here.
 */
onMounted(async () => {

	paginationStore.activeFetchURL = "http://localhost:8888/api/feed/"
	const loggedInUserProfileURL = "http://localhost:8888/api/min-side/"

	/**
	* Fetches the profile information of the logged-in user
	*/
	await getLoggedInUserProfile(loggedInUserProfileURL)

	/**
	 * Fetches all posts in snippets (not full content length)
	   */
	paginationStore.activeFetchURL = "http://localhost:8888/api/feed/"

	await getPostMultipleSnippet(paginationStore.activeFetchURL)

	/** 
	 * Fetches all possible tags. And then assigns all of them in a variable in the post store
	*/
	await getAllTags()
})


/**
 * Middleware in the background makes sure that only authenticated users can access this page,
 * or else they are redirected to the /wait page
 */

/**
 * This changes the layout the pages uses dynamically, based on wait.vue or not.
 */

const num_of_following = computed(() =>
	loggedInUserStore.loggedInUserProfile.num_of_following
);


/**
 * Makes sure that the variables tracking the information for which checkboxes are checked are emptied when a refresh happens,
 * or an unmount.
 * 
 * This is important because if that does not happen, the checkboxes status might be restarted, but not the state of them,
 * and ends them up not being syncronous.
 */
onBeforeUnmount(() => {
	console.log("Index is unmounted")

	/** So there are no filters present when the page gets refreshed */
	searchStore.$reset

	/** So that all posts are "removed" and forces a refetch */
	postStore.$reset

	/** So that the navigation bar / paginator at the button restarts, and starts at one  */
	paginationStore.$reset

})

</script>

<style scoped></style>