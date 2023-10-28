<template>
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8 bg-surfaceContainerLowest rounded-lg text-onSurface" v-if="generalStore.isAuthenticated === false">
		<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
			Sign in to your account
		</h1>
		<div id="form" class="space-y-4 md:space-y-6">
			<FormKit id="login_form" type="form" submit-label="Sign in" @submit="submitForm" :actions="false">
				<div>
					<FormKit type="text" name="username" label="Brukernavn" placeholder="jane43" validation="required"
						label-class="prose text-onSurface"
						input-class="prose border border-gray-300 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
						message-class="prose text-onSurface text-sm text-red-500" />
				</div>

				<div class="mt-2">
					<FormKit type="password" name="password" label="Password" validation="required"
						placeholder="************" label-class="prose text-onSurface"
						input-class="prose border border-gray-300 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
						message-class="prose text-sm text-red-500  text-onSurface" />
				</div>
				<div id="button" class="mt-4 shadow-sm">
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
					<nuxt-link to="/registrer/" class="font-medium text-primary hover:underline">
						Sign up
					</nuxt-link>
				</p>
			</FormKit>
		</div>
	</div>
</template>

<script setup lang="ts">
//@ts-nocheck
import { useGeneralStore } from '~/store/generalStore';

const generalStore = useGeneralStore()
const loginerror = ref(false);
const loginsucess = ref(false);

const baseURL = "http://localhost:8888/api/login/";
const { redirect } = defineProps(["redirect"]);

const submitForm = async (formData:any) => {
	const response = await postForm(baseURL, formData)

	if (response.data?.token != null) {

		setLocalInfo(response.data.token, response.data.username);

		loginsucess.value = true;
		loginerror.value = false;

			if (redirect === true) {
				return navigateTo("minkonto");
			}
	} else {
		loginsucess.value = false;
		loginerror.value = true;
	}
}
</script>
