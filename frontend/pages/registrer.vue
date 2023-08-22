
<template>
	<div>
		<FormKit
			type="form"
			id="register_form"
			:form-class="submitted ? 'hide' : 'show'"
			submit-label="Create account"
			@submit="submitForm"
			:actions="false"
			#default="{ value }"
		>
			<h1>Registration form</h1>
			<hr />
			<FormKit
				type="text"
				name="username"
				label="Username"
				placeholder="example"
				help="Write a username"
				validation="required"
			/>
			<FormKit
				type="text"
				name="first_name"
				label="First name"
				placeholder="Jane"
				help="Write your first name"
				validation="required"
				/>
			<FormKit
				type="text"
				name="last_name"
				label="Last name"
				placeholder="Doe"
				help="Write your last name"
				validation="required"
			/>
			<FormKit
				type="text"
				name="email"
				label="Email"
				placeholder="jane@example.com"
				help="Write your email address"
				validation="required|email"
			/>
				<div class="double">
			<FormKit
					type="password"
					name="password"
					label="Password"
					validation="required|length:6|matches:/[^a-zA-Z]/"
					:validation-messages="{
					matches: 'Please include at least one symbol',
					}"
					placeholder="Your password"
					help="Choose a password"
			/>
			<FormKit
					type="password"
					name="password_confirm"
					label="Confirm password"
					placeholder="Confirm password"
					validation="required|confirm"
					help="Confirm your password"
			/>
			</div>
			<FormKit
				type="submit"
				label="Register"
			/>
				<pre wrap>{{ value }}</pre>
		</FormKit>
		<div v-if="submitted">
		<h2 class="text-green-300">Submission successful!</h2>
		</div>
	</div>
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
