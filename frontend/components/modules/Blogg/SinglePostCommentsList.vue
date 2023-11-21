<template>
    <div v-if="comments?.length">
        <div v-for="(comment, index) of comments" :key="index">
            <SinglePostCommentSingle
            :comment="comment"
            :post-author="postAuthor"
            class="p-4 border-2 mt-2 rounded-md"
            />
        </div>
    </div>
    <div v-else>
        <p>No comments.</p>
    </div>
</template>

<script setup lang="ts">
/**
 * Loops through all comments passed down through props, and
 * then loops through them and renders them all.
 */

defineProps<{
    comments:CommentType[] | null;
    postAuthor:string;
}>()

</script>

<style scoped>

</style>