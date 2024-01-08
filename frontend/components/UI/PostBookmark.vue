<template>
    <span>
        <!--
            ! this is a bad implementation
            TODO fix this later so it isnt two components
            * posible with nuxt ui
        -->
        <BaseIconSaveArticleSaved v-if="checkIfPostIsSaved(post)" @click="unsave(post)" />

        <!-- Hovering over makes it gray-->
        <BaseIconSaveArticleUnSaved v-else @mouseover="color = 'gray'" @mouseleave="color = 'black'"
            @click="save(post)" :fill-color="color" />
    </span>
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

const toast = useToast()

// Importing the loggedInUserStore from the store directory

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
    toast.add({
        title: 'Post unsaved',
        timeout:2000,
    })
}

/**
 * Adds the selected post to the saved posts list.
 * @param post - Numeric ID of the post to save.
 */
const save = async (post: number) => {
    await getSaveOrUnsavePost(post);
    toast.add({
        title: 'Post saved',
        timeout:2000,
    })
}

// Note: The function getSaveOrUnsavePost is used but not defined or imported in this snippet.
// Ensure it is properly defined and imported for the component to function correctly.
</script>

<style scoped></style>