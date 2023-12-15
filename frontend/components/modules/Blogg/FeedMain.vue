<template>
    <div data-test="everything" class="w-full">

        <!-- Doing v-if on the componenents that use the stores included in the v-if - or else error -->

        <div id="top-search">
            <!--
                * Unsure whether I want to do it this way
            -->
            <FeedTopSearch v-if="postStore.posts && loggedInUserStore.loggedInUserProfile" />
        </div>

        <div id="top-choice">

            <FeedTopChoice v-if="authStore.isAuthenticated && postStore.posts && postStore.posts?.results" />
        </div>
        <!-- I need to do this v-if statement because of when I am using following i dont what this here I think (strictly speaking not necesarry to use v-if) -->
        <div id="posts-list">
            <FeedPostsList class="w-full mt-12" />
        </div>
        <!-- <div v-else>
            <SkeletonFeedPostsList />
        </div> -->
    </div>
</template>

<script setup lang="ts">

const authStore = useAuthStore()

const loggedInUserStore = useLoggedInUserStore()
const postStore = usePostStore()

</script>