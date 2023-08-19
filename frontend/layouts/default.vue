<template>
    <div id="site-wrapper" class="bg-[#F4F7BE]">
        <div id="header" class="h-[350px] w-full bg-[#E5F77D] flex align-middle justify-center">
            <div class="pt-[80px]">
                <h1 class="text-center font-light text-6xl leading-[115px] tracking-[-1.5px]">THE BLOG</h1>
                <p class="text-center text-[24px] leading-[30px]">For those who listen and hear</p>
            </div>
        </div>
        <div id="navbar" class="w-full text-[14px] text-white py-2 px-1 h-[70px] bg-[#823038]">
            <ul class="flex justify-end">
                <li class="me-5">Kontakt</li>
                <li class="me-5">Om oss</li>
                <li class="me-5">Registrer</li>
                <li class="me-5">Login</li>
            </ul>
        </div>
          <slot />
        </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>