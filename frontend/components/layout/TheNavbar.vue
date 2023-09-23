<template>
<TheNavbarLoggedIn v-if="store.isAuthenticated" />
<TheNavbarLoggedOut v-else />
</template>

<script setup lang="ts">
import { useGeneralStore } from "~/store/generalStore";
import TheNavbarLoggedOut from "./TheNavbarLoggedOut.vue";
import TheNavbarLoggedIn from "./TheNavbarLoggedIn.vue";

const store = useGeneralStore();

checkLocalInfo;
</script>

<style scoped></style>