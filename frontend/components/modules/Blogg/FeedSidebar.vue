<template>
	<!-- <Suspense> -->
		<!-- <template #default> -->
			<FeedPostsListSidebar v-if="authStore.isAuthenticated" />
			<FeedSidebarNotAuthenticated v-else />
		<!-- </template> -->
		<!-- <template #fallback>
			<SkeletonFeedPostsListSidebar />
		</template> -->
	<!-- </Suspense> -->
</template>

<script setup lang="ts">
const authStore = useAuthStore();

/**
 * Fetches the loggedInUserProfile data/information
 */
const fetchLoggedInUserInformation = async () => {
	const loggedInUserProfileURL = urls.users.myUser.profile;
	// console.log(loggedInUserProfileURL) // print to self
	await getLoggedInUserProfile(loggedInUserProfileURL);
};

/**
 * If the user is authenticated/logged in, it executes the prior function
 * and gets the data
 */

onBeforeMount(async () => {
	/**
	 * ! dont really understand why I have to do authStore.authStoreSsetup()
	 * TODO understand why
	 * 
	 * TODO Fix the problem under, where I have to fetch:
	 */
	authStore.authStoreSetup()
	if (authStore.isAuthenticated == false) {
		await fetchLoggedInUserInformation();
	}
	await fetchLoggedInUserInformation();

});
</script>

<style scoped></style>
