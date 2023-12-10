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

onBeforeMount(() => {
    authStore.authStoreSetup()

})

</script>