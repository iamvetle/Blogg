<template>
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8 bg-surfaceContainerLowest rounded-lg text-onSurface">
		<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
			Sign in to your account
		</h1>
		<div id="form" class="space-y-4 md:space-y-6">
			<FormKit id="login_form" type="form" submit-label="Sign in" @submit="submitForm" :actions="false">


				<!-- Username -->
				<div data-test="form_username">
					<FormKit type="text" name="username" label="Brukernavn" validation="required"
						:label-class="baseLabelClass" :input-class="baseInputClass" :message-class="baseMessageClass" />
				</div>

				<!-- Password and password confirmation-->
				<div class="mt-2" data-test="form_password">
					<FormKit type="password" name="password" label="Password" validation="required"
						:label-class="baseLabelClass" :input-class="baseInputClass" :message-class="baseMessageClass" />
				</div>

				<div data-test="form_button_submit" id="submit_button" class="mt-4 shadow-sm">
					<FormKit type="submit" label="Bekreft"
						input-class="w-full text-onPrimary bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center" />
				</div>

				<p v-show="loginerror" class="mt-5 text-red-700">
					Invalid credentials
				</p>
				<p v-show="loginsucess" class="mt-5 text-green-700">
					Login successfull
				</p>
				<p class="text-sm  text-onSurface font-light mt-3">
					Don't have an account yet?
					<NuxtLink to="/registrer/" class="font-medium text-primary hover:underline">
						Sign up
					</NuxtLink>
				</p>
			</FormKit>
		</div>
	</div>
</template>

<script setup lang="ts">
//@ts-nocheck

import { reset } from '@formkit/core'

const authStore = useAuthStore()

const address = ref(null)
const all = ref<any>(null)

const loginerror = ref(false);
const loginsucess = ref(false);

const baseLabelClass = "prose text-onSurface"
const baseInputClass = "prose border border-gray-300 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
const baseMessageClass = "prose text-onSurface text-sm text-red-500"

const baseURL = urls.baseApiURL
const genders = ["Male", "Female", "Annet"]

withDefaults(defineProps<{
	redirect?: boolean
}>(), {
	redirect: true
})

const submitForm = async (formData: any, node) => {
	const responseData = await postForm(baseURL, formData)

	/** If the request was successfull */
	if (responseData) {

		/** Takes the username and token from the responseData and puts it in localStorage */
		authStore.setTokenToLocalStorage(responseData.token)
		authStore.setUsernameToLocalStorage(responseData.username)

		loginsucess.value = true;
		loginerror.value = false;

		/** 
		 * Redirects the user to the minkonto page if the prop 
		 * passed is 'true', otherwise, not redirected
		 * 
		 * ? Unsure whether I this is a good idea
		 */

		return navigateTo("/minkonto");


		/**
		 * If the request was null, it failed, then all fields are reset	 * 
		*/
	} else {
		/**
		 * 'Reset' clears the input fields if the if request is failed.
		 * 
		 * It is an imported function from the formkit core.
		 */
		reset("login_form")

		/** A success message is shown if the request succeds */
		loginsucess.value = false;

		/** When the the request fails an 'inccorect credentials' message is shown*/
		loginerror.value = true;
	}
}
</script>
