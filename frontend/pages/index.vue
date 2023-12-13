<template>
	<div class="mt-8 max-w-[1100px] w-full mx-auto px-6 grid grid-cols-10 gap-28">
		<div data-test="everything" class="col-span-6 mx-auto w-full">
			<FeedMain />
		</div>
		<div id="feed-sidebar" class="col-span-4 mx-auto w-full">
			<FeedSidebar />
		</div>
	</div>
	<!-- fallback -->
</template>

<script setup lang="ts">

const postStore = usePostStore()
const searchStore = useSearchStore()
const paginationStore = usePaginationStore()

definePageMeta({
	layout: "feed-layout"
})

/**
 * if all of these are true, then the page can be rendered:
 * 
 * - the user is authenticated
 * - there data about the logged in user (logged in user data is fetched)
 * - There are data about posts (post(s) data is fetched)
 * 
 * returns true if all of those "requirements are met", false otherwise
 * 
 * ? maybe i should have this in a store instead ?
 */
// const ready = computed(() => {
// 	if ((postStore.posts) && (loggedInUserStore.loggedInUserProfile) && (authStore?.isAuthenticated)) {
// 		return true
// 	} else {
// 		return false
// 	}
// })

// Declerations

/**
 * ! what about fetching when "following" buttons is on
 * ? what about fetching when "following" buttons is on

 * 
 * NEW: I removed the IF statements that was meant to check whether it was already information/posts there already,
 * but it said it was when it wasnt sometimes, which was very weird, so I removed it on all->
 */

/**
 * All of the data that is needed from the api endpoint is fetched here.
 */
const fetchData = async () => {


	/**
	* Fetches the profile information of the logged-in user
	*/
	const loggedInUserProfileURL = urls.users.myUser.profile
	await getLoggedInUserProfile(loggedInUserProfileURL)

	/**
	 * Fetches all posts in snippets (not full content length)
	 * 
	 * * not strictly necesarry as it is already reset when the index get's unmounted (but what about when the index wasnt mounted in the first palce do? - dont know)
	 */
	paginationStore.activeFetchURL = urls.api.posts.feed

	await getPostMultipleSnippet(paginationStore.activeFetchURL)

	/** 
	 * Fetches all possible tags. And then assigns all of them in a variable in the post store
	*/
	await getAllTags()
}

onBeforeMount(async () => await fetchData())


/**
 * Middleware in the background makes sure that only authenticated users can access this page,
 * or else they are redirected to the /wait page
 */


/**
 * Makes sure that the variables tracking the information for which checkboxes are checked are emptied when a refresh happens,
 * or an unmount.
 * 
 * This is important because if that does not happen, the checkboxes status might be restarted, but not the state of them,
 * and ends them up not being syncronous.
 */
onUnmounted(() => {

	/** This makes sure that all the filters and the search is removed*/
	searchStore.resetStore()

	/** So that all posts are "removed" and forces a refetch */
	postStore.resetStore()

	/** So that the navigation bar / paginator at the button restarts, and starts at one  */
	paginationStore.resetStore()

})

</script>

<style scoped></style>