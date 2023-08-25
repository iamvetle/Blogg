<template>
	<NavbarLoggedIn v-if="token"/>
	<NavbarLoggedOut v-else/>
</template>


<script setup lang="ts"> // Used by mainpage.vue - for feed

const token = ref<null | string>(null)

onMounted(() => token.value = localStorage.getItem("token"))
</script>

<style scoped></style>