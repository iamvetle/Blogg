<template>
	<div id="personal-user-card"
		class="mx-auto mb-8 px-8 py-4 rounded-lg text-onSecondaryContainer bg-secondaryContainer shadow-md w-full">
		<div class="mb-4 w-full flex flex-wrap min-w-0 items-center text-onPrimaryContainer">

			<slot name="profile_picture"></slot>

			<div class="min-w-0">
				<h2 id="card-username" class="text-4xl text-onPrimaryContainer whitespace-normal break-words">
					<slot name="username"></slot>

				</h2>
				<span>
					<span @click="redirect_to_my_profile_page" id="card-name"
						class="hover:text-onSurfaceVariant cursor-pointer text-onPrimaryContainer">
						<slot name="full-name"></slot>
					</span>
				</span>
			</div>
		</div>
		<p class="text-onPrimaryContainer">

			<slot name="amount-of-followers"></slot>

		</p>
		<span class="text-onPrimaryContainer">
			<slot name="amount-of-saved-posts"></slot>

		</span>
	</div>
</template>

<script setup lang="ts">

const redirect_to_my_profile_page = () => {

	return navigateTo(`/minkonto/`)
}

</script>

<style scoped></style>