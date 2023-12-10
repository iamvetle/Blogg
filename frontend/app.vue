<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
    </div>
</template>

<script setup lang="ts">

const authStore = useAuthStore()

onMounted(() => {
    authStore.authStoreSetup()

})

</script>