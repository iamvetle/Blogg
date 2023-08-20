<template>
    <div id="navbar" class="w-full text-white py-2 px-1 h-[50px] bg-[#823038] flex justify-end items-center">
        <ul class="flex text-sm">
            <nuxt-link to="/kontakt">
                <li class="me-7 hover:text-yellow-300">Kontakt</li>
            </nuxt-link>
            <nuxt-link to="/om-oss">
                <li class="me-7 hover:text-yellow-300">Om oss</li>
            </nuxt-link>
            <nuxt-link to="/registrer">
                <li class="me-7 hover:text-yellow-300">Registrer</li>
            </nuxt-link>
            <nuxt-link to="/login">
                <li class="me-7 hover:text-yellow-300">Login</li>
            </nuxt-link>
        </ul>
    </div>
</template>

<script setup lang="ts"> // Used by mainpage.vue - for feed

</script>

<style scoped>

</style>

