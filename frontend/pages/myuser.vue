<template>
    <div v-if="account">
        <h2>Hello {{ account.username }}</h2>
        <p>{{ account.email }}</p>
        <p>{{ account.first_name }}</p>
        <p>{{ account.last_name }}</p>
    </div>
    <div else v-on="accountError()">
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

const baseURL = "http://localstorage:8888/api/myuser/"
let account: null | Account = null

function accountError() {
    console.log("The account object is null or undefined")
}

onMounted( () => {
    const token = localStorage.getItem("token")
    
    axios.get(baseURL, { 
        "headers": {
            'Authorization': `Token ${token}`
        }
    })
    .then((response) => {
        const data: Account = response.data
            account = {
                "username": data.username,
                "email": data.email,
                "first_name": data.first_name,
                "last_name": data.last_name,
            }
    })
})


</script>

<style scoped>

</style>