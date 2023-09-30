<template>
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<h1 class="text-xl font-bold leading-tight tracking-tight text-onPrimary md:text-2xl">
			Sign in to your account
		</h1>
		<div id="form" class="space-y-4 md:space-y-6">
			<FormKit id="login_form" type="form" submit-label="Sign in" @submit="submitForm" :actions="false">
				<div>
					<FormKit type="text" name="username" label="Brukernavn" placeholder="jane43" validation="required"
						label-class="prose text-onPrimary"
						input-class="prose bg-surface border border-gray-300 text-onSurface sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						message-class="prose text-sm text-red-500" />
				</div>

				<div class="mt-2">
					<FormKit type="password" name="password" label="Password" validation="required"
						placeholder="************" label-class="prose text-onPrimary"
						input-class="prose bg-surface border border-gray-300 text-onSurface sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						message-class="prose text-sm text-red-500" />
				</div>
				<div id="button" class="mt-4 shadow-sm">
					<FormKit type="submit" label="Bekreft"
						input-class="w-full text-onSecondary bg-secondary bg-secondaryFixed focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" />
				</div>

				<p v-show="loginerror" class="mt-5 text-red-700">
					Invalid credentials
				</p>
				<p v-show="loginsucess" class="mt-5 text-green-700">
					Login successfull
				</p>
				<p class="text-sm font-light text-onPrimary mt-3">
					Don't have an account yet?
					<nuxt-link to="/registrer/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
						Sign up
					</nuxt-link>
				</p>
			</FormKit>
		</div>
	</div>
</template>

<script setup>
const loginerror = ref(false);
const loginsucess = ref(false);

const baseURL = "http://localhost:8888/api/login/";
const { redirect } = defineProps(["redirect"]);

const submitForm = async (formData) => {
	const response = await postForm(baseURL, formData)

	if (response?.token != null || response?.username != null) {

		setLocalInfo(response.token, response.username);

		loginsucess.value = true;
		loginerror.value = false;

		setTimeout(() => {
			if (redirect === true) {
				return navigateTo("min-side");
			}
		}, 1000);
	} else {
		loginsucess.value = false;
		loginerror.value = true;
	}
}
</script>
