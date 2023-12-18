<template>
	<div>
		<NavbarLoggedIn data-test="logged_in_navbar" v-if="authStore.isAuthenticated"/>
		<NavbarNotLoggedIn v-else data-test="logged_out_navbar"/>
	</div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

</script>

<style scoped>

</style>