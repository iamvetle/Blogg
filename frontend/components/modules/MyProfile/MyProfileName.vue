<template>
    <h1>
        {{ first_name }} {{ last_name }}
    </h1>
</template>

<script setup lang="ts">

const loggedInUserStore = useLoggedInUserStore()

const first_name = computed(() => loggedInUserStore.loggedInUserProfile.first_name)
const last_name = computed(() => loggedInUserStore.loggedInUserProfile.last_name)


</script>

<style scoped></style>