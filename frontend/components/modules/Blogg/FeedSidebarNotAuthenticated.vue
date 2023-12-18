<template>
    <div>
        <UCard>
            <template #header>
                <div class="prose">
                    <h2>Create an account</h2>
                </div>
            </template>

            <template #default>
                <div class="px-4 prose">
                    <span class="block font-bold mb-2">By creating an account you can:</span>
                    <ul class="">
                        <li>Bookmark posts</li>
                        <li>Create you own posts</li>
                        <li>Follow users</li>
                        <li>Comment on posts</li>
                    </ul>
                </div>
            </template>
            <template #footer>
                <div class="space-x-6 flex justify-center">
                    <NuxtLink to="/login">
                        <UButton data-test="login_here" class="hover:shadow-md hover:bg-onPrimary text-primary bg-onPrimary ring-primary ring-1">Login</UButton>
                    </NuxtLink>
                    <NuxtLink to="/registrer">
                        <UButton data-test="register_here" class="hover:shadow-md hover:bg-primary bg-primary" >Register</UButton>
                    </NuxtLink>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>