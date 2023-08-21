<template>
    <div v-if="account">
        <h2>Hello {{ account.username }}</h2>
        <p>{{ account.email }}</p>
        <p>{{ account.first_name }}</p>
        <p>{{ account.last_name }}</p>
        <hr>
        <nuxt-link to="/newpost"><button class="border py-1 px-2">Create new post</button></nuxt-link>
    </div>
    <div v-else="accountError()"> <!-- Will always first cause this. TODO: Fix-->
        <p>An error occured. See console log.</p>
    </div>
</template>

<script setup lang="ts">

// Typescript 'Types' (TODO: Expand on later)
type Account = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}
// -----

import axios from 'axios'

const baseURL = "http://localhost:8888/api/myuser/"
let account = ref<null | Account>(null)

function accountError() {
    console.log("The account object is null or undefined")
}

function fetchIt() { 
    const token = localStorage.getItem("token")

    axios.get("http://localhost:8888/api/myuser/", { 
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then((response) => {
        const data: Account = response.data
            account.value = {
                username: data.username,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
            }
    })
    .catch((error) => console.error(error))
}

onMounted(fetchIt)

</script>

<style scoped>

</style>