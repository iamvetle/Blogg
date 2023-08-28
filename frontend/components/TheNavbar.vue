<template>
	<NavbarLoggedIn
		v-if="store.isAuthenticated"
	/>
	<NavbarLoggedOut
		v-else
	/>
</template>


<script setup lang="ts">
//@ts-nocheck

import { useGeneralStore } from '@/store/generalStore';
const store = useGeneralStore()


</script>

<style scoped></style>store/generalStore