<template>
    <!-- <div id="feed-dropdown-filter" v-if="selected === false" class="mb-4 bg-primary rounded-lg text-onPrimary">
        <FeedDropdownFilter />
    </div> -->
    <!-- This lists the (saved)articles in thes sidebar -->

    <Suspense>
        <template #default>
            <div id="feed-post-list-sidebar">
                <FeedPostsListSidebar class="w-full" />
            </div>
        </template>
        <template #fallback>
            <div>
                <SkeletonFeedPostsListSidebar />
            </div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">


</script>

<style scoped></style>