<template>
    <!-- <div id="feed-dropdown-filter" v-if="selected === false" class="mb-4 bg-primary rounded-lg text-onPrimary">
        <FeedDropdownFilter />
    </div> -->
    <!-- This lists the (saved)articles in thes sidebar -->
    <div v-if="loggedInUserStore.loggedInUserProfile" id="feed-post-list-sidebar">
        <FeedPostsListSidebar class="w-full"/>
    </div>
    <div v-else>
        <SkeletonFeedPostsListSidebar/>
    </div>
    </template>

<script setup lang="ts">

const loggedInUserStore = useLoggedInUserStore()

</script>

<style scoped></style>