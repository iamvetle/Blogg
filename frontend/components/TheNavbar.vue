<template>
    <div id="navbar-wrapper"> <!-- Navbar -->
        <div class="w-full h-[70px] bg-[#DEBA6F] justify-between flex items-center ">
            <div id="logo">
                <nuxt-link to="/">
                    <img src="~/assets/noimage.jpg" alt="The Blog - logo" class="w-auto h-[60px] ms-7">
                </nuxt-link>
            </div>
            <ul class="flex space-x-5 me-7">
                <nuxt-link to="/"><li class="hover:text-red-300">Home</li></nuxt-link>
                <nuxt-link to="/registrer/"><li class="">Registrer</li></nuxt-link>
                <nuxt-link to="/login/"><li class="">Logg inn</li></nuxt-link>
                <nuxt-link to="/myuser/"><li class="">myuser</li></nuxt-link> <!--Remove later-->                
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts"> // default - used by all posts

</script>

<style scoped>

</style>