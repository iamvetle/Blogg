<template>
	<ClientOnly>
		<NavbarLoggedIn v-if="store.isAuthenticated"/>
		<NavbarLoggedOut v-else/>
	</ClientOnly>
</template>


<script setup lang="ts"> // Used by mainpage.vue - for feed

import { useGeneralStore } from '@/store/posts'

const store = useGeneralStore()

</script>

<style scoped></style>