<!-- <template>
<ElementNavbarLoggedIn v-if="store.isAuthenticated" />
<ElementNavbarLoggedOut v-else />
</template>

<script setup lang="ts">
import { useGeneralStore } from "~/store/generalStore";

const store = useGeneralStore();

checkLocalInfo;
</script>

<style scoped></style> -->

<template>
	<div class="bg-primary-base">
		<div id="navbar" class="h-16 justify-between flex items-center p-6 md:10/12 sm:w-11/12 w-12/12 mx-auto">
		
		
			<div class="flex items-center">
			<h2 class="text-white text-2xl flex ms-8 me-6"><nuxt-link to="/">Bloggen</nuxt-link></h2>
				<input @keyup.enter="trySearch" v-model="search_input" type="text" class="border-plain shadow-sm rounded-md h-10 md:max-w-[250px] max-w-[175px] hidden items-center sm:flex" placeholder="Søk..">
			</div>
			<div id="nav-menu" class="flex text-center items-center p-6">
				<ul class="flex items-center">
					<li @click="toggleSearch" id="search-icon" class="text-white sm:hidden flex flex-col me-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-6 hover:h-7 w-auto fill-white" viewBox="0 0 24 24"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
						<p class="text-xs sm:block hidden text-center"></p>
					</li>
					<li id="new-post" class="text-white flex text-center flex-col me-4">
						<nuxt-link to="/newpost">
							<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-6 hover:h-7 w-auto fill-white" viewBox="0 0 24 24"><path d="M14 3V5H4V18.3851L5.76282 17H20V10H22V18C22 18.5523 21.5523 19 21 19H6.45455L2 22.5V4C2 3.44772 2.44772 3 3 3H14ZM19 3V0H21V3H24V5H21V8H19V5H16V3H19Z"></path></svg>
							<p class="text-xs sm:block hidden text-center">Nytt innlegg</p>
						</nuxt-link>
					</li>
					<li id="user-account" class="text-white flex text-center flex-col me-8">
						<nuxt-link to="/min-side">
							<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-6 hover:h-7 w-auto fill-white" viewBox="0 0 24 24"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z"></path></svg>
							<p class="text-xs sm:block hidden text-center">Min side</p>
						</nuxt-link>
					</li>
					<!-- <li id="logout">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-white" viewBox="0 0 24 24"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
					</li> -->
				</ul>
			</div>
		</div>
		<input autofocus @keyup.enter="trySearch" v-model="search_input" v-if="mobileSearch" type="text" class="sm:hidden flex rounded-md h-10 mx-auto w-8/12 mb-5 bt-4" placeholder="Søk..">
	</div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/store/searchStore';

const mobileSearch = ref(false)


const toggleSearch = () => {
	mobileSearch.value = !mobileSearch.value	
}

const search_input = ref("")
const store = useSearchStore()

const trySearch = async () => {
	store.lastSearch = search_input.value

	if ( search_input.value.trim() != "" ) {

		store.baseSearchURL = `http://localhost:8888/api/search/?q=${search_input.value}`
		
		await searchRequest()
		console.log(search_input.value)
		search_input.value = ""

		return await navigateTo(`/search?q=${search_input.value}`)
	}
}

</script>

<style scoped>

</style>
