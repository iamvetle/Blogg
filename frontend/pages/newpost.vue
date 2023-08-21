<template>
    <div>
        <form @submit.prevent="publishPost">
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

function publishPost() {
    const token = localStorage.getItem("token")

    const data = {
        title:titleInput.value,
        content:textInput.value,
        author: {
            username:"iamvetle"
        }
    }

    axios.post(baseURL, data, { 
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then((response) => {
        console.log("Successfilly added the post", response.data)
    })
    .catch((error) => {
        console.error(error)
    })
}
</script>

<style scoped>

</style>