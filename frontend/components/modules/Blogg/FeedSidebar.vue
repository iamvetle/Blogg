<template>
	<Suspense>
		<template #default>
			<FeedSidebarNotAuthenticated />
		</template>
		<template #fallback>
			<div>
				<SkeletonFeedPostsListSidebar />
			</div>
		</template>
	</Suspense>
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
	if (authStore.isAuthenticated != false) {
		await fetchLoggedInUserInformation();
	}
});
</script>

<style scoped></style>
