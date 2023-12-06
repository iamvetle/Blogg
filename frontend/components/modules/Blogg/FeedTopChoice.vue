<template>
    <div>
        <span class="flex space-x-8 justify-center">
            <BaseButton class="p-2 rounded-lg"
                :class="selected ? 'bg-onPrimary text-primary border-primary border shadow-md  ' : 'bg-primary text-onPrimary border'"
                data-test="feed-posts-option" @click="feedPostSetting" text="Feed" />

            <BaseButton class="p-2 rounded-lg" data-test="following-posts-option" @click="followingPostSetting"
                :class="selected ? 'bg-primary text-onPrimary border' : 'bg-onPrimary text-primary border-primary border shadow-md'"
                text="Following" />
        </span>
        <p class="text-lg" v-if="(num_of_following === 0) && (selected) && (postStore.posts?.results.length == 0)">
            You are
            not
            following anyone.</p>
        <p class="text-lg" v-if="(postStore.posts?.results.length === 0) && (selected) && (num_of_following > 0)">
            None of who you are following have published anything.</p>
    </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

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
    return (loggedInUserStore.loggedInUserProfile?.num_of_following) ?? 0
}
);


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