<template> 
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
    </h1>

    <div id="form">
        <form class="space-y-4 md:space-y-6" @submit.prevent="loginForm">
            <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ditt brukernavn</label>
                <input v-model="usernameInput" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="jane34" required >
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passord</label>
                <input v-model="passwordInput" type="password" name="password" id="password" placeholder="************" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required >
            </div>
            
            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            
            <p class="mt-5 text-red-700" v-show="loginerror">Invalid credentials</p>
            <p class="mt-5 text-green-700" v-show="loginsucess">Login successfull</p>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <nuxt-link to="/registrer/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</nuxt-link>
            </p>
        </form>
        
    </div>
</template>

<script setup lang="ts">

import axios from 'axios'

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

function tokenCheck() {
    let token = localStorage.getItem("token")

    if (token !== null) {
        console.log("Token found, no need for client to be here.")
        return navigateTo("/")
    }
}

onBeforeMount(tokenCheck) // TODO: Switch to 'middleware' instead

</script>
