<template>
	<div class="text-center space-x-6">
		<FeedTopChoiceFeedOptionButton
			data-test="feed_all_posts_option_button"
			:show-as-selected="showFollowingPosts"
			@show-all-feed-posts="handleShowAllFeedPosts"
		/>
		<FeedTopChoiceFollowingOptionButton
			data-test="following_posts_option"
			:show-as-selected="showFollowingPosts === false ? true : false"
			@click="handleShowFollowingPosts"
		/>
	</div>
</template>

<script setup lang="ts">


const searchStore = useSearchStore()
const paginationStore = usePaginationStore()


const showFollowingPosts = computed(() => {
	if (paginationStore?.activeFetchURL === urls.api.posts.following) {
		return true;
	} else {
		return false;
	}
});

/**
 * This is called when the 'feed button' is clicked.
 *
 * It changes the api endpoint url from where posts are fetched to
 * the main feed one. It then fetches all posts.
 */
 const handleShowFollowingPosts = async () => {
	const router = useRouter()

	searchStore.resetStore();

	// Sets the active url to the basic following url
	paginationStore.activeFetchURL = urls.api.posts.following;
	await getPostMultipleFollowingOnly(paginationStore.activeFetchURL);

	router.push({
	query: {
		following:"true"
	}
})

/**
 * This is called when the 'feed button' is clicked.
 *
 * It changes the api endpoint url from where posts are fetched to
 * the main feed one. It then fetches all posts.
 *
 * It has its base here - the url.
 */
 const handleShowAllFeedPosts = async () => {
	searchStore.resetStore();

	paginationStore.activeFetchURL = urls.api.posts.feed;
	await getPostMultipleSnippet(paginationStore.activeFetchURL);
};

</script>

<style scoped></style>
