<template>
    <div>
        <p><strong>Content: </strong>'{{ comment.content }}'</p>
        <span class="text-sm block mt-2"><strong>Author: </strong>{{ theAuthor }}</span>
        <span class="text-xs block-mt-4"><strong>Date published: </strong>{{ comment.date_published }}</span>
    </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '@/store/generalStore';

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
const theAuthor = computed(() => {
    const logged_in_user_username = generalStore.username
    const author_of_post = props.comment.author

    if (logged_in_user_username === author_of_post) {
        return "You"
    } else {
        return author_of_post
    }
})

</script>

<style scoped></style>