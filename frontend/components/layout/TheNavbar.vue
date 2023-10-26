<template>
	<div id="container-navbar" class="w-full py-4 text-onPrimary bg-primary mb-16">
		<div id="navbar" class="h-[50px] mx-auto flex items-center max-w-[1000px] bg-primary justify-between">

			<span class="flex items-center">

				<nuxt-link to="/" @click="logoclick()">
					<span id="logo">
						<svg class="w-8 h-auto cursor-pointer fill-onPrimary" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24">
							<path
								d="M19.9381 8H21C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8ZM3 10V14H4V10H3ZM20 10V14H21V10H20ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z" />
						</svg>
					</span>
				</nuxt-link>

				<span v-if="generalStore.isAuthenticated" id="searchbar" class="ms-8">
					<BaseSearchBar @search-action="search"
						class="bg-surface text-onSurface shadow-sm rounded-md h-10 md:max-w-[250px] max-w-[175px] hidden items-center sm:flex" />
				</span>
			</span>


			<span class="flex items-center">

				<span v-if="generalStore.isAuthenticated" id="new-post" class="me-4 flex items-center flex-col">
					<nuxt-link to="/newpost"><svg class="mb-1 w-7 h-auto fill-onPrimary hover:fill-onPrimaryFixed"
							xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M14 3V5H4V18.3851L5.76282 17H20V10H22V18C22 18.5523 21.5523 19 21 19H6.45455L2 22.5V4C2 3.44772 2.44772 3 3 3H14ZM19 3V0H21V3H24V5H21V8H19V5H16V3H19Z" />
						</svg></nuxt-link>
					<span class="text-xs"><nuxt-link to="/newpost">Nytt innlegg</nuxt-link></span>
				</span>

				<span v-if="generalStore.isAuthenticated" class="me-4 flex items-center flex-col">
					<nuxt-link to="/minkonto"><svg class="mb-1 w-8 h-auto fill-onPrimary hover:fill-onPrimaryFixed"
							xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z" />
						</svg></nuxt-link>
					<span class="text-xs"><nuxt-link to="/minkonto">Min profil</nuxt-link></span>
				</span>

				<span v-if="generalStore.isAuthenticated" class="me-4 flex items-center flex-col">
					<nuxt-link to="/loggut">
						<svg class="mb-1 w-8 h-auto fill-onPrimary hover:fill-onPrimaryFixed"
							xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M1.99805 21.0003V19.0003L3.99805 19.0001V4.83489C3.99805 4.35161 4.34367 3.93748 4.81916 3.85102L14.2907 2.12892C14.6167 2.06965 14.9291 2.28589 14.9884 2.61191C14.9948 2.64733 14.998 2.68325 14.998 2.71924V4.00014L18.998 4.00032C19.5503 4.00032 19.998 4.44803 19.998 5.00032V19.0001L21.998 19.0003V21.0003H17.998V6.00032L14.998 6.00014V21.0003H1.99805ZM12.998 4.39674L5.99805 5.66947V19.0003H12.998V4.39674ZM11.998 11.0003V13.0003H9.99805V11.0003H11.998Z">
							</path>
						</svg>
					</nuxt-link>
					<span class="text-xs"><nuxt-link to="/loggut">loggut</nuxt-link></span>
				</span>

			</span>

		</div>
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';
import { useSearchStore } from '~/store/searchStore';
import { usePostStore } from '~/store/postStore';
import { usePaginationStore } from '../../store/paginationStore';

const paginationStore = usePaginationStore()
const postStore = usePostStore()

const generalStore = useGeneralStore();
const searchStore = useSearchStore();
const route = useRoute()

const search = async (payload: any) => {
	if (route.path != "/") {
		navigateTo("/")
	}
	if (payload.trim() != "") {
		searchStore.searchPart = payload
	} else {
		searchStore.searchPart = ""
	}
	constructURL()
	await getPostMultipleSnippet()
}

/** 
 * 'Resets' to default. Goes and fetches the "normal" all posts, without extra
 * queries
 * 
 * Is suppose to be a "close everything and go back"
 * 
 * something else: in index when the logo is click here the page gets refreshsen twices i donn't know why
 */
const logoclick = async () => {

	/**
	 * the keep alive component is forced to rerender because the
	 * store post (which it rrelias on in a v-if) gets refreshesd here */

	if (route.path === "/") {
		postStore.posts = null

		paginationStore.all_pages_count = 0;
		paginationStore.current_page_number = 0;
		paginationStore.activeFetchURL = postStore.baseFetchURL;
		paginationStore.next_page = "";
		paginationStore.previous_page = "";
		paginationStore.last_page_link = "";

		searchStore.searchPart = null;
	}

	await getPostMultipleSnippet()

}

</script>

<style scoped></style>