<template>
	<NavbarLoggedIn v-if="token"/>
	<NavbarLoggedOut v-else/>
</template>


<script setup lang="ts"> // Used by mainpage.vue - for feed

const token = localStorage.getItem("token")
</script>

<style scoped></style>