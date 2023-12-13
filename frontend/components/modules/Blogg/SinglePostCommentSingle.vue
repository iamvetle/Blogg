<template>
    <div>
        <div>
            <p><strong>Content: </strong>'{{ comment.content }}'</p>

            <!-- Only displays "you" if you are the owner of that comment-->
            <span v-if="checkIfLoggedInUser(comment.author)" class="text-sm block mt-2"><strong>Author: </strong>{{ comment.author
            }}(You)</span>
            <span v-else class="text-sm block mt-2"><strong>Author: </strong>{{ comment.author }}</span>

            <span class="text-xs block-mt-4"><strong>Date published: </strong>{{ comment.date_published }}</span>
        </div>
        <div v-if="theAuthorIsLoggedInUser" id="fire">
            <BaseButton @click="deleteComment" data-test="delete-comment-button"
                class="bg-primary text-onPrimary py-1 rounded-md" text="Delete" />
        </div>
    </div>
</template>

<script setup lang="ts">

/**
 * CommentItem component.
 * 
 * This component displays a single comment, including its content, author, 
 * and publication date. It also provides a delete button if the logged-in user
 * is the author of the comment.
 * 
 * @component
 * @example
 * <CommentItem :comment="{ id: 1, content: 'Sample comment', author: 'user123', date_published: '2022-01-01' }"/>
 */
const props = defineProps<{
    /**
     * The comment object to display.
     */
    comment: CommentType;
    /**
     * The username of the author of the post
     */
    postAuthor: string;
}>();

/**
 * Computed property to determine if the logged-in user is the author of the comment.
 */
const theAuthorIsLoggedInUser = computed(() => {
    if (checkIfLoggedInUser(props.comment.author) || checkIfLoggedInUser(props.postAuthor)) {
        return true
    } else {
        return false
    }
}


)

/**
 * Deletes the comment.
 * This function is only called if the delete button is present,
 * which only occurs if the logged-in user is the author of the comment.
 * It sends a DELETE request to the comment endpoint.
 */
const deleteComment = async () => {

    const baseCommentURL = urls.api.posts.singlePost.action.removeComment(props.comment.post as number, props.comment.id as number)

    const response = await deleteSinglePostSingleComment(baseCommentURL)

    if (response) {
        const basePostURL = urls.api.posts.singlePost.comments(props.comment.post as number)
        await getSinglePostComments(basePostURL)
    } else {
        console.error("An error occured while trying to delete comment")
    }
}


</script>

<style scoped></style>