<template>
    <div>
        <div v-if="removed">
            <p>Du er nå logged ut.</p>
        </div>
        <div v-else>
            <p>Logget ut.</p>
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