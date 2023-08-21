<template>
    <form @submit.prevent="loginForm">
        <div class="container w-2/12 mx-auto pt-20">
        <h1 class="text-2xl pb-4">Login page</h1>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="usernameInput" required class="border block mb-2 border-blue-500">
        <label for="pwd">Password:</label>
        <input type="password" id="pwd" v-model="passwordInput" required class="border block border-blue-500">
        
        <button type="submit" class="rounded-sm bg-slate-400 mt-4 text-white px-1 py-1">Submit        </button>

        <hr class="block my-4" />
        
        <p class="mt-5 text-red-700" v-show="loginerror">Invalid credentials</p>
        <p class="mt-5 text-green-700" v-show="loginsucess">Login successfull</p>

        <p class="mt-5">No account?</p>
        <p class="pt-2">Click her to register for a new account</p>
        <button class="bg-slate-200 p-1 rounded-sm mt-3"><nuxt-link to="/register">Register</nuxt-link></button>
    </div>
    </form>
</template> 

<script setup lang="ts">

import axios from 'axios' // Make into component later

const baseURL = "http://localhost:8888/api/login/"
let usernameInput = ref<string | null>(null)
let passwordInput = ref<string | null>(null)

let loginerror = false
let loginsucess = false

 
function loginForm() {
    axios.post(baseURL, {
        "username":usernameInput.value,
        "password":passwordInput.value,
    })
    .then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data.token)
        loginsucess = true
        loginerror = false
        console.log(`Successfully logged in.`)
        usernameInput.value = ""
        passwordInput.value = ""
    })
    .catch((error) => {
        console.error(error.data)
        loginerror = true
    })
}
 
onBeforeMount( () => { // TODO: Switch to 'middleware' instead
    let token = localStorage.getItem("token")

    if (token !== null) {
        console.log("Token found, no need for client to be here.")
        return navigateTo("/")
    }
})

</script>

<style scoped>

</style>