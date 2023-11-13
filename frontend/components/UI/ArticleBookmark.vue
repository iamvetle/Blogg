<template>
    <div>
        <BaseIconSaveArticleSaved v-if="checkIfPostIsSaved(post)" @click="unsave(post)" />

        <BaseIconSaveArticleUnSaved v-else @mouseover="color = 'fill-primary'" @mouseleave="color = 'fill-black'"
            @click="save(post)" :fill-color="color" />


    </div>
</template>

<script setup lang="ts">
/**
 * This component controls the logic and also the visual v-if/ else 
 * for when a bookmark is pressed, and if it gets SAVED or UNSAVED
 */


/** @description post here is the id of the article */
defineProps<{
    post:number;
}>();

const color = ref("fill-black")

import { useLoggedInUserStore } from '~/store/loggedInUserStore';

const loggedInUserStore = useLoggedInUserStore()

/**
 * Removes the clicked upon post from 'saved posts' 
 * @param post - the post that you want to unsave
 */
 const unsave = async (post: number) => {
	const index = loggedInUserStore.idArrayOfSavedPosts.findIndex((id) => id === post)

	loggedInUserStore.idArrayOfSavedPosts.splice(index, 1)

	await getSaveOrUnsavePost(post)
}

/**
 * Adds the clicked upon post to 'saved posts' 
 * @param post - the post that you want to save
 */
const save = async (post: number) => {

	await getSaveOrUnsavePost(post)
}

</script>

<style scoped></style>