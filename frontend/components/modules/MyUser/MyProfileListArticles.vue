<template>
    <div v-if="(postStore.loggedInUserPosts.results) && (loggedInUserStore.loggedInUserProfile.first_name)">
        <h2 class="text-xl text-onPrimary font-bold mt-8 mb-6">
            All posts by {{ loggedInUserStore.loggedInUserProfile.first_name }}
        </h2>
        <MyProfileArticleCard v-for="post in postStore.loggedInUserPosts.results" :key="post.id" :post="post" />
    </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

/**
 * Lists all posts made by the loggedinuser - part of the minkonto page
 */

const loggedInUserStore = useLoggedInUserStore()
const postStore = usePostStore()

</script>

<style scoped></style>