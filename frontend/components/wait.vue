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
        <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900">
            Velkommen
            </h2>
            <p class="mt-2 text-sm text-gray-500">Please sign in to your account</p>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true">
            <div class="relative">
            <div class="absolute right-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">Username</label>
            <input
                class=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                type="" placeholder="mail@gmail.com" value="mail@gmail.com">
            </div>
            <div class="mt-8 content-center">
            <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                Password
            </label>
            <input
                class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                type="" placeholder="Enter your password" value="*****|">
            </div>
            <div>
            <button type="submit"
                class="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Sign in
            </button>
            </div>
            <p class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Don't have an account?</span>
            <a href="#"
                class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign
                up</a>
            </p>
        </form>
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