<template>
    <div>
        <Username
        :username="username"
        />
    </div>
</template>

<script setup lang="ts">


const loggedInUserStore = useLoggedInUserStore()

const username = computed(() => loggedInUserStore.loggedInUserProfile.username)

</script>

<style scoped></style>