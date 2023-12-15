<template>
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