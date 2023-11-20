<template>
    <div>
        <h2>Comments written: ({{ post.num_of_comments }})</h2>
        <div>
            <SinglePostCommentsList :comments="postStore.allComments" />
        </div>

        <hr>

        <SinglePostCommentAdd :post-id="post.id" />
    </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore';

/**
 * This component is part of the single post [id] page
 * It deals with the comments associated with the post and
 * other comments stuff
 */

const postStore = usePostStore()

defineProps<{
    post:PostSingleType
}>();

</script>

<style scoped></style>