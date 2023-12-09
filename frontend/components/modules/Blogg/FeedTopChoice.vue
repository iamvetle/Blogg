<template>
    <div v-if="postStore.posts">
        <span class="flex space-x-8 justify-center">
            <BaseButton class="p-2 rounded-lg"
                :class="selected ? 'bg-onPrimary text-primary border-primary border shadow-md  ' : 'bg-primary text-onPrimary border'"
                data-test="feed-posts-option" @click="feedPostSetting" text="Feed" />

            <BaseButton class="p-2 rounded-lg" data-test="following-posts-option" @click="followingPostSetting"
                :class="selected ? 'bg-primary text-onPrimary border' : 'bg-onPrimary text-primary border-primary border shadow-md'"
                text="Following" />
        </span>

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
const feedPostSetting = async () => {
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
const followingPostSetting = async () => {

    searchStore.resetStore()

    paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"
    await getPostMultipleSnippet(paginationStore.activeFetchURL)
}

</script>

<style scoped></style>