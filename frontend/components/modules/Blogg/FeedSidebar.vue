<template>
    <div id="feed-dropdown-filter" v-if="postStore.allTags && !selected" class="mb-4 bg-primary rounded-lg text-onPrimary">
        <FeedDropdownFilter />
    </div>
    <!-- This lists the (saved)articles in thes sidebar -->
        <div id="feed-post-list-sidebar">
            <FeedPostsListSidebar class="w-full" v-if="loggedInUserStore.loggedInUserProfile" />
        </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';

const paginationStore = usePaginationStore()
const loggedInUserStore = useLoggedInUserStore()

const selected = computed(() => (paginationStore.activeFetchURL === "http://localhost:8888/api/feed/following/"))

const postStore = usePostStore()


</script>

<style scoped></style>