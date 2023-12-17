<template>
    <div v-if="postStore.allComments">
        <h2>Comments written: ({{ num_of_comments }})</h2>
        <div>
            <SinglePostCommentsList :comments="postStore.allComments" :post-author="post.author.username"/>
        </div>

        <hr>

        <SinglePostCommentAdd v-if="authStore.isAuthenticated" :post-id="post.id" />
    </div>
</template>

<script setup lang="ts">

/**
 * This component is part of the single post [id] page
 * It deals with the comments associated with the post and
 * other comments stuff
 */

const authStore = useAuthStore()

const postStore = usePostStore()

/**
 * Counts the number of comments - I do it this way for me to keep the reactivity
 */
const num_of_comments = computed(() => {
    return postStore.allComments?.length ?? 0

})

defineProps<{
    post:PostSingleType
}>();

</script>

<style scoped></style>