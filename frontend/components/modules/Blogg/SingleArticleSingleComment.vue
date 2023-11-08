<template>
    <div>
        <p><strong>Content: </strong>'{{ comment.content }}'</p>
        <span class="text-sm block mt-2"><strong>Author: </strong>{{ comment.author }}</span>
        <span class="text-xs block-mt-4"><strong>Date published: </strong>{{ comment.date_published }}</span>
    </div>
</template>

<script setup lang="ts">

/**
 * The component goes together with the SingleArticleListComments
 * component.
 * 
 * Purpose: render one comment (passed through with prop)
 */

defineProps<{
    comment: CommentType
}>();

</script>

<style scoped></style>