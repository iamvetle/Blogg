<template>
    <div class="bg-onPrimary mb-6 px-5 py-5 border rounded-lg border-primary">
        <div class="flex justify-between">
            <span class="font-bold cursor-pointer" @click="redirectToPostPage(post.id)">{{ post.title }}</span>
            <span class="flex">
                <span class="mr-2">posted: </span>
                <span class="">{{ post.date_published }}</span>
            </span>
        </div>
        <div class="break-words">
            <p data-test="content-html" class="mt-2" v-text="toPlainText(post.content_snippet)">
            </p>
        </div>
        <div class="flex">
            <span v-for="tag in post.tags" :key="tag.name" class="mr-2">
                <BaseTag :text="tag.name" />
            </span>
        </div>
        <div class="flex justify-between items-center">
            <span class="cursor-pointer text text-primary hover:text-primaryFixed" @click="redirectToPostPage(post.id)"
                data-test="read">
                Les mer
            </span>
            <BaseButton text="Slett" class="rounded-lg p-1 text-sm text-bold text-white bg-red-500 hover:bg-red-300" data-test="del" @click="deletePostRequest(post.id)"/>
        </div>
    </div>
</template>

<script setup lang="ts">
// For the posts in the 'minkonto'

const { post } = defineProps(["post"]);
console.log(post)

/**
 * Redirects the web client to the page of the post 
 * @param post 
 */
const redirectToPostPage = (postId: SnippetPostSingleType) => {

    return navigateTo(`/post/${postId}`)
}


/** 
 * The function takes the html input and returns only the raw text
 * @returns - the raw text of the html
*/
const toPlainText = (htmlContent: string) => {
    const div = document.createElement('div')
    div.innerHTML = htmlContent
    const rawText = div.textContent || div.innerText
    return rawText
}

/**
 * This function tries to delete the post that has been provided with the call
 */

const deletePostRequest = async (postId: number) => {
    const minSideMyPostURL = `http://localhost:8888/api/min-side/posts/${postId}/edit/`
    const minSideMyPostsURL = `http://localhost:8888/api/min-side/posts/`

    const responseData = await deleteLoggedInUserPost(minSideMyPostURL)

    if (responseData) {
        // alert("success i think") // print(alert) to self
    }
    
    await getLoggedInUserAllPostSnippets(minSideMyPostsURL)
}






</script>


<style scoped></style>
