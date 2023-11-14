<template>
    <div v-for="post in loggedInUserStore.loggedInUserProfile.saved_posts">
        <article-saved-card :key="post.post.id">

            <template #title>
                <span @click="redirect_to_post_page(post.post.id)" data-test="redirect_to_author" class="cursor-pointer">{{
                    post.post.title
                }}</span>
            </template>

            <template #author>
                <span @click="redirect_to_author_page(post.post.username)" data-test="redirect_to_post"
                    class="cursor-pointer">{{ post.post.username
                    }}</span>
            </template>

        </article-saved-card>
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

/**
 * Lists all of the posts the logged in user has saved
 * 
 * But does not do api fetching
 */

const loggedInUserStore = useLoggedInUserStore()


const redirect_to_post_page = (postId: any) => {

    return navigateTo(`/post/${postId}`)
}

const redirect_to_author_page = (username: any) => {

    return navigateTo(`/user/${username}`)
}

</script>

<style scoped></style>