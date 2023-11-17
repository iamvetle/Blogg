<template>
    <form @submit.prevent="tryAddComment" data-test="comment-add-form">
        <div>
            <BaseButton text="Submit" class="bg-primary text-onPrimary p-1 rounded-md mb-2"
                data-test="submit_comment_button" />
            <div data-test="input_comment_text">
                <BaseTextareaInput v-model="textInput" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">

/**
 * @component CommentForm
 * @description Allows users to add comments to a specific post.
 * 
 * @prop {number} postId - The ID of the post to which the comment is being added.
 *
 * @emits {Event} submit - Emits an event when the comment is successfully submitted.
 */
const props = defineProps({
    postId: Number,
});

const baseCommentURL = `http://localhost:8888/api/post/${props.postId}/add-comment/`;
const allPostCommentsURL = `http://localhost:8888/api/post/${props.postId}/comments/`;
const textInput = ref("");

/**
 * @method tryAddComment
 * @description Submits a new comment to the post. Clears the input after submission and refetches comments.
 * @async
 * @returns
 */
const tryAddComment = async () => {
    if (textInput.value.trim()) {
        const postBody = { post: props.postId, content: textInput.value };
        const response = await postCommentOnPost(baseCommentURL, postBody);
        textInput.value = "";

        const responseComment = await getSinglePostComments(allPostCommentsURL);
        if (!responseComment) {
            console.error("Error fetching post comments");
        }

        if (!response) {
            console.error("Error submitting comment");
        }
    }
};
</script>

<style scoped></style>
