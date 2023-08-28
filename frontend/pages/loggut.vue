<template>
    <div>
        <div v-if="removed">
            <p>Du er nå logged ut.</p>
        </div>
        <div v-else>
            <p>Logges ut..</p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useGeneralStore } from '@/store/posts';

const store = useGeneralStore()

// put definepagemeta

const removed = ref(false)

const logoutFunction = () => {
    const token = localStorage.getItem("token")

    if (token != null) {
        localStorage.removeItem("token")
        
        removed.value = true //@ts-ignore
        store.isAuthenticated = true

        setTimeout(() => {
            navigateTo("/login")
            }, 1000 )
    } else {
        navigateTo("/")// temperory redirectioon
    }

}

onMounted(logoutFunction)

</script>

<style scoped>

</style>