<template>
	<Suspense>
		<template #default>
            <!-- 
                If the user is authenticated the loggedInUser informatino is shown-
                * Should change name of component
            -->
			<FeedPostsListSidebar
				v-if="authStore.isAuthenticated"
				class="w-full"
			/>
            <!-- If the user is not authenticated, the basic? information is shown-->
			<FeedSidebarNotAuthenticated v-else />
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
