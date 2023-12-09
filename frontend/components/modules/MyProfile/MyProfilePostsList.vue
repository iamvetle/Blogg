<template>
    <div v-if="(postStore.loggedInUserPosts.results) && (loggedInUserStore.loggedInUserProfile.first_name)">
        <h2 class="text-xl text-onPrimary font-bold mt-8 mb-6">
            All posts by {{ loggedInUserStore.loggedInUserProfile.first_name }}
        </h2>
        <span v-for="post in postStore.loggedInUserPosts.results">
            <MyProfilePostPreviewCard :key="post.id" :post="post" />
        </span>
    </div>
</template>

<script setup lang="ts">

/**
 * Lists all posts made by the loggedinuser - part of the minkonto page
 */

const loggedInUserStore = useLoggedInUserStore()
const postStore = usePostStore()

</script>

<style scoped></style>