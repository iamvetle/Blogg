<template>
    <div>
        <BaseIconSaveArticleSaved v-if="checkIfPostIsSaved(post)" @click="unsave(post)" />

        <BaseIconSaveArticleUnSaved v-else @mouseover="color = 'fill-primary'" @mouseleave="color = 'fill-black'"
            @click="save(post)" :fill-color="color" />
    </div>
</template>

<script setup lang="ts">
/**
 * This component handles the functionality for saving and unsaving articles. 
 * It shows different icons based on the saved state of the article.
 */

// Props definition
// @prop post - Numeric ID of the article.
defineProps<{
    post: number;
}>();

// Reactive variable for icon color
const color = ref("fill-black");

// Importing the loggedInUserStore from the store directory
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

// Using the loggedInUserStore for managing the saved posts
const loggedInUserStore = useLoggedInUserStore();

/**
 * Removes the selected post from the saved posts list.
 * @param post - Numeric ID of the post to unsave.
 */
const unsave = async (post: number) => {
    const index = loggedInUserStore.idArrayOfSavedPosts.findIndex((id) => id === post);
    loggedInUserStore.idArrayOfSavedPosts.splice(index, 1);
    await getSaveOrUnsavePost(post);
}

/**
 * Adds the selected post to the saved posts list.
 * @param post - Numeric ID of the post to save.
 */
const save = async (post: number) => {
    await getSaveOrUnsavePost(post);
}

// Note: The function getSaveOrUnsavePost is used but not defined or imported in this snippet.
// Ensure it is properly defined and imported for the component to function correctly.
</script>

<style scoped></style>