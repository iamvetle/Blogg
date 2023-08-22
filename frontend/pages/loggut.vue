<template>
    <div>
        <div v-if="removed">
            <p>You are now logged out.</p>
        </div>
        <div v-else>
            <p>Logged out.</p>
        </div>
    </div>
</template>

<script setup lang="ts">

const removed = ref(false)

function logoutFunction() {
    if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token")
        removed.value = true
    }
}

onMounted(logoutFunction)

</script>

<style scoped>

</style>