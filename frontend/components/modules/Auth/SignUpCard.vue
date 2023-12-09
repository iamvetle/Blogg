<template>
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
			Create and account
		</h1>
		<div id="form" class="space-y-4 md:space-y-6">
			<FormKit id="register_form" type="form" :form-class="submitted ? 'hide' : 'show'" submit-label="Create account"
				@submit="submitForm" :actions="false">
				<div data-test="form_username">
					<FormKit type="text" name="username" label="Brukernavn" placeholder="jane43" validation="required"
						:label-class="baseLabelClass" :input-class="baseInputClass" :message-class="baseMessageClass" />
				</div>
				<!-- 
				<div class="mt-2" data-test="form_first_name">
					<FormKit type="text" name="first_name" label="Fornavn" placeholder="Jane" validation="required"
						:label-class="baseLabelClass" :input-class="baseInputClass" :message-class="baseMessageClass" />
				</div>

				<div class="mt-2" data-test="form_last_name">
					<FormKit type="text" name="last_name" label="Etternavn" placeholder="Doe" validation="required"
						:label-class="baseLabelClass" :input-class="baseInputClass" :message-class="baseMessageClass" />
				</div> -->

				<div class="mt-2" data-test="form_email">
					<FormKit type="email" name="email" label="Email" placeholder="joe@example.com"
						validation="required|email" :label-class="baseLabelClass" :input-class="baseInputClass"
						:message-class="baseMessageClass" />
				</div>

				<div data-test="form_full_name">
					<!-- First name -->
					<div class="mt-2" data-test="form_first_name">
						<FormKit type="text" name="first_name" label="First name" validation="required"
							:label-class="baseLabelClass" :input-class="baseInputClass" :message-class="baseMessageClass" />
					</div>
					<!-- Last name -->
					<div class="mt-2" data-test="form_last_name">
						<FormKit  type="text" name="last_name" label="Last name" validation="required"
							:label-class="baseLabelClass" :input-class="baseInputClass" :message-class="baseMessageClass" />
					</div>
				</div>

				<!-- Passord -->
				<div class="double flex justify-between space-x-2 mt-2" data-test="form_password">
					<!-- Skriv passord -->
					<FormKit type="password" name="password" label="Password" data-test="form_password_set"
						validation="required|length:6|matches:/[^a-zA-Z]/" :validation-messages="{
							matches: 'Inkluder minst ett symbol',
						}" placeholder="************" :label-class="baseLabelClass" :input-class="baseInputClass"
						:message-class="baseMessageClass" />

					<!-- Bekreft Passord -->
					<FormKit type="password" name="password_confirm" data-test="form_password_confirm" label="Bekreft passord" placeholder="************"
						validation="required|confirm" :label-class="baseLabelClass" :input-class="baseInputClass"
						:message-class="baseMessageClass" />
				</div>
				
				<!--
						! The phone validation is not finished
					-->

				<!-- Phone Number-->
				<div data-test="form_phone_number">
					<FormKit type="tel" name="phone_number" label="Phone number" validation="matches:/^[0-9]{3}[0-9]{2}[0-9]{3}$/"
						:validation-messages="{
							matches: 'Invalid format',
						}" :label-class="baseLabelClass" :input-class="baseInputClass" :message-class="baseMessageClass" />
				</div>

				<!-- Birth Date-->
				<div data-test="form_birth_date">
					<FormKit type="date" name="date_of_birth" label="Fødselsdato" validation="required|date_before:2010-01-01"
						validation-visibility="lazy" :label-class="baseLabelClass" :input-class="baseInputClass"
						:message-class="baseMessageClass" :validation-messages="{
							required: 'Fødselsdato er nødvendig',
						}" />
				</div>

				<!-- Gender -->
				<div data-test="form_gender">
					<FormKit type="select" label="Choose gender?" name="gender" :options="genders"
						:label-class="baseLabelClass" placeholder="Velg kjønn" :input-class="baseInputClass" :message-class="baseMessageClass"
						validation="required" />
				</div>

				<!-- Addresse -->
				<div data-test="form_address">
					<FormKit type="text" label="Adresse" name="address" placeholder="Addresse" :label-class="baseLabelClass"
						:input-class="baseInputClass" :message-class="baseMessageClass" />
				</div>

				<!-- Country -->
				<div data-test="form_country">
					<FormKit type="text" label="Land" placeholder="Land" name="country" :label-class="baseLabelClass"
						:input-class="baseInputClass" :message-class="baseMessageClass" />
				</div>

				<div data-test="form_city">
					<FormKit type="text" name="city" label="By" placeholder="By" :label-class="baseLabelClass"
						:input-class="baseInputClass" :message-class="baseMessageClass" />
				</div>

				<!-- <FormKit data-test="form_county" type="select" label="Fylke" name="country" placeholder="Fylke" :options="Fylker"
								validation="" /> -->
				<!-- Postal code -->
				<div data-test="form_postal_code">
					<FormKit type="text" name="postal_code" label="Postnummer" placeholder="Post addressen"
						validation="number" :label-class="baseLabelClass" :input-class="baseInputClass"
						:message-class="baseMessageClass" />
				</div>
				<!-- Submit -->
				<div data-test="form_button_submit" id="submit_button" class="mt-4 shadow-sm">
					<FormKit type="submit" label="Bekreft"
						input-class="w-full text-onPrimary bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center" />
				</div>


				<p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
					Already have an account?
					<nuxt-link to="/login/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
						Login here
					</nuxt-link>>
				</p>
			</FormKit>
		</div>


		<div v-if="submitted">
			<h2 class="text-green-600">
				Suksess i å lage en ny konto!
			</h2>
		</div>
	</div>
</template>

<script setup lang="ts">
//@ts-nocheck


const baseLabelClass = "prose text-onSurface"
const baseInputClass = "prose border border-gray-300 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
const baseMessageClass = "prose text-onSurface text-sm text-red-500"

const genders = ["Male", "Female", "Other"]

const submitted = ref(false);
const baseURL = "http://localhost:8888/api/registrer/";

const all = ref(null)

const submitForm = async (formData) => {
	const responseData = await postForm(baseURL, formData);
	if (responseData) {
		submitted.value = true;
		setTimeout(() => {
			navigateTo("/login");
		}, 1000);
	}
	else {
		console.log("The signup failed for some reason") // print to self
	}
	all.value = formData
	console.log(formData)
};
</script>
