<template>
    <div v-if="tags" class="mb-2 flex space-x-1" id="tags">
        <span class="flex" v-for="tag in tags">
            <BaseTag :text="tag" :key="tag.name" />
        </span>
    </div>
</template>

<script setup lang="ts">
/**
 * Contains multiple tags.
 * 
 * Loops through the tags, one after another.
 */

defineProps<({
    tags: TagType[]
})>()

</script>

<style scoped></style>