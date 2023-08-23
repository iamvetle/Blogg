
<template>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
			<a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
				<img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
				Flowbite    
			</a>
			<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								type="text"
								name="username"
								label="Username"
								placeholder="example"
								validation="required"
							/>
						</div>
						
						<div class="mt-2">
							<FormKit
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								type="text"
								name="first_name"
								label="First name"
								placeholder="Jane"
								validation="required"
							/>
						</div>
					
						<div class="mt-2">
							<FormKit
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								type="text"
								name="last_name"
								label="Last name"
								placeholder="Doe"
								validation="required"
							/>
						</div>

						<div class="mt-2">
							<FormKit
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								type="text"
								name="email"
								label="Email"
								placeholder="name@example.com"
								validation="required|email"
							/>
						</div>

						<div class="double flex justify-between mt-2">
							<FormKit
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								type="password"
								name="password"
								label="Password"
								validation="required|length:6|matches:/[^a-zA-Z]/"
								:validation-messages="{
								matches: 'Please include at least one symbol',
								}"
								placeholder="Your password"
							/>
							<FormKit
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								type="password"
								name="password_confirm"
								label="Confirm password"
								placeholder="Confirm password"
								validation="required|confirm"
							/>
						</div>
							<div id="button" class="mt-4">
								<FormKit
									className ="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									type="submit"
									label="Submit"
								/>
							</div>
						<p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
							Already have an account? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
						</p>
						</FormKit>
						</div>
					<div v-if="submitted">
						<h2 class="text-green-300">Submission successful!</h2>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">

import axios from 'axios'

const baseURL = "http://localhost:8888/api/register/"
const submitted = ref(false)

const submitForm = async (formData:object) => {
	const data = formData
	try {
		const response = await axios.post(baseURL, data)
		console.log("Successfully created user account", response.data)
		submitted.value = true
	} catch {
		console.log("Failed creating user account")
	}
}
</script>