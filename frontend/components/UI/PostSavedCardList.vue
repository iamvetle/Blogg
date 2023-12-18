<template>
    <div v-if="all_saved_posts != 0">
        <div v-for="post in all_saved_posts">
            <post-saved-card :key="post.post.id">
                <template #title>
                    <span @click="redirect_to_post_page(post.post.id)" class="cursor-pointer">{{
                        post.post.title
                    }}</span>
                </template>
                <template #author>
                    <span @click="redirect_to_author_page(post.post.username)" class="cursor-pointer">{{ post.post.username
                    }}</span>
                </template>
            </post-saved-card>
        </div>
    </div>
    <div v-else>
        <p>You have no posts saved.</p>
    </div>
</template>

<script setup lang="ts">

/**
 * Lists all of the posts the logged in user has saved
 * 
 * * does not do api fetching
 */

const loggedInUserStore = useLoggedInUserStore()

const all_saved_posts = computed(() => loggedInUserStore.loggedInUserProfile?.saved_posts ?? [])


const redirect_to_post_page = (postId: any) => {

    return navigateTo(`/post/${postId}`)
}

const redirect_to_author_page = (username: any) => {

    return navigateTo(`/user/${username}`)
}

</script>

<style scoped></style>