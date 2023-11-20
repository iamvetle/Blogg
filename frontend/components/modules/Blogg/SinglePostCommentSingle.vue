<template>
    <div>
        <div>
            <p><strong>Content: </strong>'{{ comment.content }}'</p>
            
            <span v-if="theAuthorIsLoggedInUser" class="text-sm block mt-2"><strong>Author: </strong>{{ comment.author }}(You)</span>
            <span v-else class="text-sm block mt-2"><strong>Author: </strong>{{ comment.author }}</span>
            
            <span class="text-xs block-mt-4"><strong>Date published: </strong>{{ comment.date_published }}</span>
        </div>
        <div v-if="theAuthorIsLoggedInUser">
            <BaseButton @click="deleteComment" data-test="delete-comment-button" class="bg-primary text-onPrimary py-1 rounded-md" text="Delete"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const generalStore = useGeneralStore()

/**
 * The component goes together with the SinglePostCommentsList
 * component.
 * 
 * Purpose: render one comment (passed through with prop)
 */

const props = defineProps<{
    comment: CommentType
}>();


/**
 * If the prop (which is the username of the author of the post) is
 * the same as the state registered username of the logged in user (you)
 * a "custom" author word is set
 */
const theAuthorIsLoggedInUser = computed(() => {
    const logged_in_user_username = generalStore.username
    const author_of_post = props.comment.author

    if (logged_in_user_username === author_of_post) {
        return true
    } else {
        return false
    }
})


/**
 * This can only be called if the button is present - which will only true
 * if the logged in user is the author of the comment
 * 
 * The function calls a composable that sends a DELETE to the comment endpoint
 */
const deleteComment = async () => {

    const baseCommentURL = `http://localhost:8888/api/post/${props.comment.post}/remove-comment/${props.comment.id}/`

    const response = await deleteSinglePostSingleComment(baseCommentURL)
    
    if (response) {
        const basePostURL = `http://localhost:8888/api/post/${props.comment.post}/comments/`
        await getSinglePostComments(basePostURL)
    } else {
        console.error("An error occured while trying to delete comment")
    }
}


</script>

<style scoped></style>