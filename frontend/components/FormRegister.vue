
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
                @submit="submitLoginForm"
                :actions="false"
                #default="{ value }"
            >

            <div>
                <FormKit
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="text"
                    name="username"
                    label="Brukernavn"
                    placeholder="jane43"
                    validation="required"
                />
            </div>
            
            <div class="mt-2">
                <FormKit
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="text"
                    name="first_name"
                    label="Fornavn"
                    placeholder="Jane"
                    validation="required"
                />
            </div>
        
            <div class="mt-2">
                <FormKit
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="text"
                    name="last_name"
                    label="Etternavn"
                    placeholder="Doe"
                    validation="required"
                />
            </div>

            <div class="mt-2">
                <FormKit
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="jane@example.com"
                    validation="required|email"
                />
            </div>

            <div class="double flex justify-between mt-2">
                <FormKit
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="password"
                    name="password"
                    label="Password"
                    validation="required|length:6|matches:/[^a-zA-Z]/"
                    :validation-messages="{
                    matches: 'Inkluder minst ett symbol',
                    }"
                    placeholder="********"
                />
                <FormKit
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="password"
                    name="password_confirm"
                    label="Bekreft passord"
                    placeholder="Passord"
                    validation="required|confirm"
                />
            </div>
                <div id="button" class="mt-4">
                    <FormKit
                        className ="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        type="submit"
                        label="Bekreft"
                    />
                </div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
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
import { useGeneralStore } from 'store/posts';

const store = useGeneralStore()

const submitted = ref(false)

async function submitLoginForm(formData:object) {
    const data = formData
    const response = await store.registerFormPost(data)
    if (response) {
        submitted.value = true        
    }
}
</script>