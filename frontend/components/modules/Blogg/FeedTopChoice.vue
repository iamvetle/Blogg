<template>
    <div v-if="postStore.posts" class="flex-row">
        
        <div class="grid gap-8 grid-cols-12 flex items-center">
            <div class="col-start-1 col-end-9 text-center space-x-6">
                <BaseButton class="p-2 rounded-lg" data-test="feed_all_posts_option_button"
                    :class="selected ? 'bg-onPrimary text-primary border-primary border shadow-md  ' : 'bg-primary text-onPrimary border'"
                    @click="setToShowAllFeedPosts" text="Feed" />
                <BaseButton class="p-2 rounded-lg" data-test="following_posts_option" @click="setToOnlyShowFollowingPosts"
                    :class="selected ? 'bg-primary text-onPrimary border' : 'bg-onPrimary text-primary border-primary border shadow-md'"
                    text="Following" />
            </div>
            <div class="col-span-4" data-test="feed_filter_component">
                <FeedDropdownFilter v-if="selected === false"/>
            </div>
        </div>

        <!-- IF the following buttons is pressed-->
        <div v-if="selected">
            <!-- Following NO one-->
            <p class="text-lg" v-if="(num_of_following === 0)">
                You are not following anyone.
            </p>
            <!-- Following someone but with NO posts -->
            <p class="text-lg" v-if="(num_of_following) && (posts_by_following === 0)">
                None of who you are following have published anything.
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

const postStore = usePostStore()
const paginationStore = usePaginationStore()
const searchStore = useSearchStore()
const loggedInUserStore = useLoggedInUserStore()

/** 
 * FEED or FOLLOWING button selected display 
 * 
 * When the buttons are clicked this changes (also by navbar search)
 * 
 * If the active url is the following url, this turns true, otherwise, it is false
 * 
 * It uses the loggedinuserstore and the poststore therefore the parentcomponent makes sure those are available before rendering these 
 */
const selected = computed(() => {
    if (paginationStore?.activeFetchURL === "http://localhost:8888/api/feed/following/") {
        return true
    } else {
        return false
    }
})


const num_of_following = computed(() => {
    if (loggedInUserStore.loggedInUserProfile && loggedInUserStore.loggedInUserProfile.num_of_following > 0) {
        return loggedInUserStore.loggedInUserProfile?.num_of_following
    } else {
        return 0
    }
});

const posts_by_following = computed(() => {
    if (postStore.posts && postStore.posts.results.length > 0) {
        return postStore.posts.results.length
    } else {
        return 0
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
const setToShowAllFeedPosts = async () => {
    searchStore.resetStore()

    paginationStore.activeFetchURL = "http://localhost:8888/api/feed/"
    await getPostMultipleSnippet(paginationStore.activeFetchURL)
}

/**
 * This is called when the 'feed button' is clicked.
 * 
 * It changes the api endpoint url from where posts are fetched to 
 * the main feed one. It then fetches all posts.
 */
const setToOnlyShowFollowingPosts = async () => {

    searchStore.resetStore()

    paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"
    await getPostMultipleFollowingOnly(paginationStore.activeFetchURL)
}

</script>

<style scoped></style>