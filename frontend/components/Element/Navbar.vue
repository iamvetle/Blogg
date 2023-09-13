<template>
  <ElementNavbarLoggedIn v-if="store.isAuthenticated" />
  <ElementNavbarLoggedOut v-else />
</template>

<script setup lang="ts">
import { useGeneralStore } from "~/store/generalStore";

const store = useGeneralStore();

checkLocalInfo;
</script>

<style scoped></style>
