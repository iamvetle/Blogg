<template>
	<div id="container-navbar" class="w-full py-6 text-onPrimary bg-primary">
		<div id="navbar" class="h-10 mx-auto flex items-center max-w-[1000px] bg-primary justify-between">

			<div class="flex items-center">

				<NuxtLink to="/" @click="logoclick()">
					<Icon name="brand" class="text-onPrimary" size="2.5em" data-test="brand_icon" />
				</NuxtLink>

				<span id="searchbar" class="ms-8">
					<BaseSearchBar @search-action="search"
						class="bg-surface text-onSurface shadow-sm rounded-md h-10 md:max-w-[250px] max-w-[175px] hidden items-center sm:flex" />
				</span>
			</div>


			<span class="flex items-center space-x-4">

				<NuxtLink to="/newpost">
					<Icon name="new-post" :class="iconClass" data-test="new_post_icon" />
				</NuxtLink>

				<NuxtLink to="/minkonto">
					<Icon name="my-profile" :class="iconClass" data-test="my_profile_icon" />
				</NuxtLink>

				<NuxtLink to="/loggut">
					<Icon name="loggout" :class="iconClass" data-test="loggout_icon"/>
				</NuxtLink>

			</span>

		</div>
	</div>
</template>

<script setup lang="ts">


const paginationStore = usePaginationStore()
const postStore = usePostStore()
const searchStore = useSearchStore();
// const authStore = useAuthStore()

const iconClass = "text-onPrimary transition-colors duration-250 hover:text-onPrimaryFixed"

/** Trims the search input/query and fetches new posts based */
const search = async (payload: any) => {
	const route = useRoute()

	if (route.path != "/") {
		navigateTo("/")
	}
	if (payload.trim() != "") {
		searchStore.searchPart = payload
	} else {
		searchStore.searchPart = ""
	}
	/**
	 * ! Ønsker ikke ha denne løsningen her. Passer ikke med seperation of concerns:
	 */

	paginationStore.activeFetchURL = constructURL(urls.baseApiURL)
	await getPostMultipleSnippet(paginationStore.activeFetchURL) // this should happend ideally on the page level



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
	const route = useRoute()


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

	await getPostMultipleSnippet(paginationStore.activeFetchURL)
}

</script>

<style scoped></style>