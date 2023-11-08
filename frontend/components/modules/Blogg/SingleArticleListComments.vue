<template>
    <div v-for="(comment, index) of comments" :key="index">
        <SingleArticleSingleComment
        :comment="comment"
        class="p-4 border mt-2 border-2"
        />
    </div>
</template>

<script setup lang="ts">

defineProps<{
    comments:CommentType[] | null
}>()

</script>

<style scoped>

</style>