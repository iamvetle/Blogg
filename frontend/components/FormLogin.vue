<template> 

<div class="p-6 space-y-4 md:space-y-6 sm:p-8">

    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
    </h1>
        <div id="form" class="space-y-4 md:space-y-6">
            <FormKit
                type="form"
                id="login_form"
                submit-label="Sign in"
                @submit="submitForm"
                :actions="false"
                #default="{ value }"
                >
        
            <div>
                <FormKit
                    type="text"
                    name="username"
                    label="Brukernavn"
                    placeholder="jane43"
                    validation="required"
                    label-class="prose"
                    input-class="prose bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    message-class="prose text-sm text-red-500"
                />
            </div>

            <div class="mt-2">
                <FormKit                    
                    type="password"
                    name="password"
                    label="Password"
                    validation="required"
                    placeholder="************"
                    label-class="prose"
                    input-class="prose bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    message-class="prose text-sm text-red-500"
                />
            </div>
            <div id="button" class="mt-4">
                    <FormKit
                        type="submit"
                        label="Bekreft"
                        input-class ="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    />
                </div>
                        
            <p class="mt-5 text-red-700" v-show="loginerror">Invalid credentials</p>
            <p class="mt-5 text-green-700" v-show="loginsucess">Login successfull</p>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
                Don't have an account yet? <nuxt-link to="/registrer/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</nuxt-link>
            </p>
        </FormKit>
        </div>
        </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '@/store/posts';

const store = useGeneralStore()

const loginerror = ref(false)
const loginsucess = ref(false)
const baseURL = "http://localhost:8888/api/login/"
 
async function submitForm(formData:object) {
    const token = await submitLoginForm(baseURL, formData) as string
    localStorage.setItem("token", token)

    if (token) {
        //@ts-ignore
        store.changeAuthenticated(true)
        
        loginsucess.value = true
        loginerror.value = false

        setTimeout(() => {
            return navigateTo("/myuser")
        }, 1000 )

    }
    else {
        loginsucess.value = false
        loginerror.value = true
    }
}

function tokenCheck() {
    const token = localStorage.getItem("token")

    if (token != null) {
        console.log("Token found, no need for client to be here.")
        return navigateTo("/myuser")
    }
}

onBeforeMount(tokenCheck)
</script>
