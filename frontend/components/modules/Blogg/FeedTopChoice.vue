<template>
    <div >
        <span class="flex justify-center space-x-8 justify-center">
            <BaseButton class="p-2 rounded-lg"
                :class="followingSelected ? 'bg-onPrimary text-primary border-primary border shadow-md  ' : 'bg-primary text-onPrimary border'"
                data-test="feed-posts-option" @click="feedPostSetting" text="Feed" />

            <BaseButton class="p-2 rounded-lg" data-test="following-posts-option" @click="followingPostSetting"
                :class="followingSelected ? 'bg-primary text-onPrimary border' : 'bg-onPrimary text-primary border-primary border shadow-md'"
                text="Following" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';

/**
 * FollowingSelected is a prop that is passed down and decides what text should be rendered:
 * "Feed", or "Following" 
 */
defineProps<{
    followingSelected: boolean
}>()

const searchStore = useSearchStore()
const paginationStore = usePaginationStore()

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