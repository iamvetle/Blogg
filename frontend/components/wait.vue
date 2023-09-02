<template>
    <div>
    <div class="relative min-h-screen flex ">
    <div class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
    <div class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
        style="background-image: url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);">
        <div class="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
        <div class="w-full  max-w-md z-10">
        <div class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">The Blogg</div>
        <div class="sm:text-sm xl:text-md text-gray-200 font-normal"> You need an account to be able to view and create posts. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit totam quo ratione expedita tempora. Eius impedit sequi numquam quas iusto quos necessitatibus voluptatibus magnam dolorem ad? Eligendi aut aspernatur provident?</div>
        </div>
        <!---remove custom style-->
    <ul class="circles">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
    </div>
    <div class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
        <div class="max-w-md w-full space-y-8">
        <FormLogin/>
        </div>
        </div>
        </div>
    </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>