<template>
    <div>
        <form @submit.prevent="loginForm">
            <label for="usernameInput">Username:</label>
            <input type="text" v-model="usernameInput">
        
            <label for="passwordInput">Password:</label>
            <input type="password" v-model="passwordInput">
            
            <label for="submit">Click to submit:</label>
            <button type="submit">Submit</button>
        </form>
    </div>
</template> 

<script setup lang="ts">

import axios from 'axios' // Make into component later

import { on } from 'events';

const baseURL = "http://localhost:8888/login/"
let usernameInput = ref(null)
let passwordInput = ref(null)

 
function loginForm() {
    axios.post(baseURL)
    .then((response) => {
        console.log(response)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("token", response.data.token) // Give token if authenticated
        console.log("Successfully logged in", localStorage.getItem("username"), localStorage.getItem("token"))
        //navigateTo("/myuser") //make the main page different or myaccount

    })
    .catch((error) => {
        console.error(error)
    })
}
 
onBeforeMount( () => { // want to later use middleware instead (that is executed before all)
    let token = localStorage.getItem("token")

    if (token !== null) {
        return navigateTo("/")
        console.log("Token found, no need for client to be here.")
    }
})


</script>

<style scoped>

</style>