<template>
	<span class="flex items-center space-x-4">
		<NuxtLink to="/registrer">
			<!-- Registrer -->
			<Icon
				name="register"
				:class="iconClass"
				data-test="new_post_icon"
			/>
		</NuxtLink>

		<NuxtLink to="/login">
			<!-- Login -->
			<Icon name="login" :class="iconClass" data-test="my_profile_icon" />
		</NuxtLink>
	</span>
</template>

<script setup lang="ts">

const iconClass =
	"text-onPrimary transition-colors duration-250 hover:text-onPrimaryFixed";

</script>

<style scoped></style>
