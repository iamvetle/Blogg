
<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create and account
        </h1>
        <div id="form" class="space-y-4 md:space-y-6">
            <FormKit
                type="form"
                id="register_form"
                :form-class="submitted ? 'hide' : 'show'"
                submit-label="Create account"
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
                    type="text"
                    name="first_name"
                    label="Fornavn"
                    placeholder="Jane"
                    validation="required"
                    label-class="prose"
                    input-class="prose bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    message-class="prose text-sm text-red-500"
                    validation-message="required"
                />
            </div>
        
            <div class="mt-2">
                <FormKit
                    type="text"
                    name="last_name"
                    label="Etternavn"
                    placeholder="Doe"
                    validation="required"
                    label-class="prose"
                    input-class="prose bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    message-class="prose text-sm text-red-500"
                    
                />
            </div>

            <div class="mt-2">
                <FormKit
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="jane@example.com"
                    validation="required|email"
                    label-class="prose"
                    input-class="prose bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    message-class="prose text-sm text-red-500"
                    
                />
            </div>

            <div class="double flex justify-between mt-2">
                <FormKit                    type="password"
                    name="password"
                    label="Password"
                    validation="required|length:6|matches:/[^a-zA-Z]/"
                    :validation-messages="{
                    matches: 'Inkluder minst ett symbol',
                    }"
                    placeholder="************"
                    label-class="prose"
                    input-class="prose bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    message-class="prose text-sm text-red-500"
                    
                />
                <FormKit
                    type="password"
                    name="password_confirm"
                    label="Bekreft passord"
                    placeholder="************"
                    validation="required|confirm"
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
            <p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
                Already have an account? <nuxt-link to="/login/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</nuxt-link>>
            </p>
            </FormKit>
            </div>
        <div v-if="submitted">
            <h2 class="text-green-600">Suksess i å lage en ny konto!</h2>
        </div>
    </div>
</template>

<script setup lang="ts">

const submitted = ref(false)
const baseURL = "http://localhost:8888/api/registrer/"

const submitForm = async(formData:object) => {
    const response = await submitRegisterForm(baseURL, formData)
    if (response === true ) {
        submitted.value = true   
        setTimeout(() => {
            navigateTo("/login")
        }, 1000 )     
    }
}
</script>