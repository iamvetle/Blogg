<template>
	<span class="flex items-center space-x-4">
		<NuxtLink to="/newpost">
			<Icon
				name="new-post"
				:class="iconClass"
				data-test="new_post_icon"
			/>
		</NuxtLink>

		<NuxtLink to="/minkonto">
			<Icon
				name="my-profile"
				:class="iconClass"
				data-test="my_profile_icon"
			/>
		</NuxtLink>

		<NuxtLink to="/loggut">
			<Icon name="loggout" :class="iconClass" data-test="loggout_icon" />
		</NuxtLink>
	</span>
</template>

<script setup lang="ts">

// const authStore = useAuthStore()

const iconClass =
	"text-onPrimary transition-colors duration-250 hover:text-onPrimaryFixed";

</script>

<style scoped></style>
