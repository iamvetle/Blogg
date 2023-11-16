<template>
    <!-- Container for the comment submission functionality -->
    <div>
        <!-- Button component to trigger comment submission -->
        <BaseButton text="Submit" @click="tryAddComment" class="bg-primary text-onPrimary p-1 rounded-md mb-2" data-test="submit_comment_button"/>
        <!-- Textarea input component for entering comments (to post) -->
        <div data-test="input_comment_text">
            <BaseTextareaInput v-model="textInput" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

// Emit function for custom events.
const emit = defineEmits(["emitComment"]);

// Props received from the parent or calling component.
const props = defineProps<{
    postId: number // ID of the post to which the comment is being added
}>();

// API endpoint for posting comments.
const baseCommentURL = `http://localhost:8888/api/post/${props.postId}/add-comment/`;

// API endpoint for fetching all comments
const allPostCommentsURL = `http://localhost:8888/api/post/${props.postId}/comments/`;

const textInput = ref(""); // Reactive state for the text input.

/**
 * Tries to add a comment to a post.
 * Submits the comment if textInput is not empty, then clears the input.
 * Logs an error if the response from the API is null.
 */
const tryAddComment = async () => {
    if (textInput.value.trim() !== "") {
        const postBody = {
            post: props.postId,
            content: textInput.value
        };
        const response = await postCommentOnPost(baseCommentURL, postBody);
        textInput.value = ""; // Clear the input field after submission.

        /** Makes a call to fetch all comments of the post again */
        const response_comment = await getSinglePostComments(allPostCommentsURL)

        /**
         * ! need to fetch comments again - implement a logic for that
         */

        if (response_comment == null) {
            console.error("Something went wrong trying to fetch the comments of the post")
        }


        if (response == null) {
            console.error("Something went wrong, response was null");
        }
    }
};
</script>

<style scoped>
</style>
