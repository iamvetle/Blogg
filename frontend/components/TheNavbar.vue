<template>
	<NavbarLoggedIn
		v-if="store.isAuthenticated"
	/>
	<NavbarLoggedOut
		v-else
	/>
</template>


<script setup lang="ts">

import { useGeneralStore } from '@/store/generalStore';
const store = useGeneralStore()

;(async() => {
	checkToken()
})()

</script>

<style scoped></style>