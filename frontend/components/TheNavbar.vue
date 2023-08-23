<template>
	<NavbarLoggedIn v-if="isAuthenticated"/>
	<NavbarLoggedOut v-else/>
</template>


<script setup lang="ts"> // Used by mainpage.vue - for feed

const isAuthenticated = ref(false)

function checkToken() {
    let token = localStorage.getItem("token")
    if (token !== null) {
        isAuthenticated.value = true
        console.log(isAuthenticated)
    }
}

onMounted(checkToken)

</script>

<style scoped></style>