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

import { useGeneralStore } from '@/store/posts';

const store = useGeneralStore()

const removed = ref(false)

function logoutFunction() {
    if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token")
        removed.value = true

        store.changeAuthenticated(false)

        setTimeout(() => {
            navigateTo("/")
        }, 1000 )

    }
}

onMounted(logoutFunction)

</script>

<style scoped>

</style>