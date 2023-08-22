<template>
    <div>
        <form @submit.prevent="newPost">
            <input class="border" v-model="titleInput" type="text" id="title">
            <textarea class="border" v-model="textInput"></textarea>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">

import axios from 'axios'

let titleInput: Ref<string | null> = ref(null)
let textInput: any = ref(null)
const baseURL = "http://localhost:8888/api/newpost/"

const newPost = async () => {
    const token = localStorage.getItem("token")

    const data = {
        title:titleInput.value,
        content:textInput.value,
    }
    try {
        const response = await axios.post(baseURL, data, { 
            headers: {
                'Authorization': `Token ${token}`  
            }
        })
        console.log("Successfully added post")
    } catch {
        console.log("Failed adding post")
    }
}
</script>

<style scoped>

</style>