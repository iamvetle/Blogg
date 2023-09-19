<template>
	<div id="navbar-wrapper">
	<nav class="border-gray-200 bg-primary-high">
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<span class="ps-7 self-center text-2xl font-semibold whitespace-nowrap text-plain">
			<nuxt-link to="/">The Blog</nuxt-link>
		</span>
		<div class="flex md:order-2">
		<button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-plain hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1" >
			<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
			<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			</svg>
			<span class="sr-only">Search</span>
		</button>
		<div class="relative hidden md:block">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			</svg>
			<span class="sr-only">Search icon</span>
			</div>
			<input @keyup.enter="trySearch" v-model="search_input" type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
		</div>
		<button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-plain rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
			<span class="sr-only">Open main menu</span>
			<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
			</svg>
		</button>
		</div>
		<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
			<div class="relative mt-3 md:hidden">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
				</svg>
			</div>
			<input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
			</div>
			<ul 
			class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row lg:space-x-8 md:space-x-6 md:mt-0 md:border-0 md:bg-transparent items-center">
			<li class="flex">
				<nuxt-link
				to="/"
				class="block py-2 pl-3 pr-4 rounded md:text-plain hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
				>Hjem</nuxt-link
				>
			</li>
			<li class="flex">
				<nuxt-link
				to="/newpost"
				class="block py-2 pl-3 pr-4 rounded md:text-plain hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
				>New post</nuxt-link
				>
			</li>
			<li class="flex">
				<nuxt-link
				to="/folgere"
				class="block py-2 pl-3 pr-4 rounded md:text-plain hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
				>Følger</nuxt-link
				>
			</li>
			<li class="flex">
				<nuxt-link
				to="/min-side"
				class="block py-2 pl-3 pr-4 rounded md:text-plain hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
				>Min side</nuxt-link
				>
			</li>
			<li class="flex">
				<nuxt-link
				to="/loggut"
				class="block py-2 pl-3 pr-4 rounded md:text-plain hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
				>Logg ut</nuxt-link
				>
			</li>
			</ul>
		</div>
		</div>
	</nav>
	</div>
</template>

<script setup lang="ts">

import { initFlowbite } from "flowbite";
import { useSearchStore } from "~/store/searchStore";

const search_input = ref("")
const store = useSearchStore()
const router = useRouter()
const route = useRoute()

const trySearch = async () => {

	if ( search_input.value.trim() != "" ) {
		
		await searchRequest(`http://localhost:8888/api/search/?q=${search_input.value}`)
		console.log(search_input.value)

		store.lastSearch = search_input.value
		search_input.value = ""
		return navigateTo(`/search?q=${search_input.value}`)
	}
}

onMounted(initFlowbite);
</script>
