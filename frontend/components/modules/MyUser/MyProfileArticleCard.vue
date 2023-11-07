<template>
    <div class="bg-onPrimary mb-6 px-5 py-5 border rounded-lg border-primary">
        <div class="flex justify-between">
            <span class="font-bold">{{ post.title }}</span>
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
            <span v-for="tag in post.tags" :key="tag.name">{{ tag.name }}</span>
        </div>
        <div>
            <span class="cursor-pointer text text-primary hover:text-primaryFixed" @click="redirectToPostPage(post.id)"
                data-test="read">
                Les mer
            </span>
            <button class="hover:text-red-500" data-test="del" @click="deletePostRequest(post.id)">Slett</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
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

const deletePostRequest = async (postId:number) => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            "Authorization":`Token ${token} `
        }

        const response = await axios.delete(`http://localhost:8888/api/min-side/posts/${postId}/edit/`, { headers })

        if (response.status == 204) {
            alert("success i think")
        }

        const minSidePostsURL = "http://localhost:8888/api/min-side/posts/"

        await getLoggedInUserAllPostSnippets(minSidePostsURL)

    } catch(e) {
        alert(e)
        console.log("delete function myprofilearticle single", e)
    }
    
}





</script>


<style scoped></style>
