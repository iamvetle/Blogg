<template>
	<div class="flex-row">
		<div class="grid gap-8 grid-cols-12 flex items-center">
			<div class="col-start-1 col-end-9">
				<!-- Only show the two options when web client is authenticated-->
				<div v-if="authStore.isAuthenticated" class="text-center space-x-6">
					<FeedTopChoiceFeedOptionButton
						data-test="feed_all_posts_option_button"
						:show-as-selected="showFollowingPosts"
						@show-all-feed-posts="handleShowAllFeedPosts"
					/>
					<FeedTopChoiceFollowingOptionButton
						data-test="following_posts_option"
						:show-as-selected="
							showFollowingPosts === false ? true : false
						"
						@show-following-posts="handleShowFollowingPosts"
					/>
				</div>
			</div>
			<div class="col-span-4" data-test="feed_filter_component">
				<FeedDropdownFilter v-if="showFollowingPosts === false" />
			</div>
		</div>

		<!-- IF the following buttons is pressed-->
		<div v-if="showFollowingPosts">
			<!-- Following NO one-->
			<p class="text-lg" v-if="num_of_following === 0">
				You are not following anyone.
			</p>
			<!-- Following someone but with NO posts -->
			<p
				class="text-lg"
				v-if="num_of_following && posts_by_following === 0"
			>
				None of whom you are following have published anything.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * Has two buttons where you can switch between seeing all posts and only the ones
 * from whom you are followning
 *
 * And the option to filter with tags
 */

const postStore = usePostStore();
const paginationStore = usePaginationStore();
const searchStore = useSearchStore();
const loggedInUserStore = useLoggedInUserStore();
const authStore = useAuthStore()

/**
 * FEED or FOLLOWING button selected display
 *
 * When the buttons are clicked this changes (also by navbar search)
 *
 * If the active url is the following url, this turns true, otherwise, it is false
 *
 * It uses the loggedinuserstore and the poststore therefore the parentcomponent makes sure those are available before rendering these
 */
const showFollowingPosts = computed(() => {
	if (paginationStore?.activeFetchURL === urls.api.posts.following) {
		return true;
	} else {
		return false;
	}
});

const num_of_following = computed(() => {
	if (
		loggedInUserStore.loggedInUserProfile &&
		loggedInUserStore.loggedInUserProfile.num_of_following > 0
	) {
		return loggedInUserStore.loggedInUserProfile?.num_of_following;
	} else {
		return 0;
	}
});

const posts_by_following = computed(() => {
	if (postStore.posts && postStore.posts.results.length > 0) {
		return postStore.posts.results.length;
	} else {
		return 0;
	}
});

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

/**
 * This is called when the 'feed button' is clicked.
 *
 * It changes the api endpoint url from where posts are fetched to
 * the main feed one. It then fetches all posts.
 */
const handleShowFollowingPosts = async () => {
	searchStore.resetStore();

	paginationStore.activeFetchURL = urls.api.posts.following;
	await getPostMultipleFollowingOnly(paginationStore.activeFetchURL);
};
</script>

<style scoped></style>
