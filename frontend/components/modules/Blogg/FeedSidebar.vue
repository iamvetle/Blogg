<template>
    <!-- This lists the (saved)articles in thes sidebar -->
    <Suspense>
        <template #default>
                <FeedPostsListSidebar v-if="authStore.isAuthenticated" class="w-full" />
                <FeedSidebarNotAuthenticated v-else/>
        </template>
        <template #fallback>
            <div>
                <SkeletonFeedPostsListSidebar />
            </div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">

const authStore = useAuthStore()


</script>

<style scoped></style>