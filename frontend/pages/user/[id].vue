<template>
	<div>
		<div class="w-9/12 mx-auto border-v pb-[60px]">
			<!-- 12/12 Grid -->
			<div
				v-if="normalUserProfile"
				class="w-full px-[80px] grid grid-cols-12 gap-[80px]"
			>
				<!-- 8/12 Main content-->
				<div
					class="inline-block col-start-1 col-end-9 border-v border-blue-500"
				>
					<!-- Profile Image -->
					<BaseImage
						id="header"
						:src="placeholder_header_image"
						class="h-[150px] w-full object-cover border-v border-slate-500"
					/>
					<div id="top" class="px-2 pt-[50px]">
						<div class="prose">
							<UserFullName
								:first_name="normalUserProfile.first_name"
								:last_name="normalUserProfile.last_name"
							/>
						</div>
						<div id="nav" class="pt-[30px]">
							<UserNav />
						</div>
						<hr class="mt-2" />
					</div>
					<!-- Start: All posts -->
					<div id="main" class="pt-[50px]">
						<UserPostsList
							:username="username"
						/>
					</div>
					<!-- End -->
				</div>
				<!-- 4/12 Sidebar -->
				<div
					id="sidebar"
					class="relative px-5 col-span-4 border-v border-red-500"
				>
					<!--/** If the user has a profile picture that one is displayed. If not, the temporary one is displayed. */-->
					<user-sidebar
						:username="normalUserProfile.username"
						:profile-picture="normalUserProfile.profile_picture"
					>
						<template #amount-of-followers>
							<div class="font-light text-sm leading-7">
								<p v-if="followers === 1">
									{{ followers }} follower
								</p>
								<p v-else>{{ followers }} followers</p>
							</div>
						</template>
						<!-- Button to follow -->
						<template #follow-button v-if="authStore.isAuthenticated">
							<BaseButtonFollow
								:username="normalUserProfile.username"
								@followers-pluss="followers++"
								@followers-minus="followers--"
							/>
						</template>
					</user-sidebar>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import placeholder_header_image from "~/assets/placeholder-image.jpg";
import UserFullName from "~/components/modules/UserProfile/UserFullName.vue";

/**
 * User Page
 *
 * This page is dedicated for the profile of each user, and displays their posts, profile information,
 * and following status, in addition to the ability to follow and unfollow the user.
 *
 * It fetches data from two API endpoints to retrieve information user profile information, and the posts
 * that the user has made. It compares the followers the user has against the whom the logged in user is following.
 * 
 * The posts are fetched in the UsersPostsList
 */

const loggedInUserStore = useLoggedInUserStore();
const route = useRoute();

/**
 * @param id The username of the user profile page
 */
const username = route.params.id.toString();

/** Stores all of the user profile information */
const normalUserProfile = ref<NormalUserProfileType | null>(null);

const authStore = useAuthStore();

/** Has the **number count** of users that the (normal)user has */
const followers = ref(0);

const dataSetup = async () => {
	/**
	 * Checks if the pinia store already has information about whom the logged-in user is following.
	 */
	if (
		!Array.isArray(loggedInUserStore.idArrayOfLoggedInUserFollowingUsers) ||
		!loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.length
	) {
		await getLoggedInUserProfile(urls.users.myUser.profile);
	}

	const theNormalUserProfileURL = urls.users.user.profile(username);

	/**
	 * Fetches the profile data about the user through the API address of the user.
	 *
	 * @param theNormalUserProfileURL The URL address that the function is going to fetch from.
	 */
	const responseData_profile = await getNormalUserProfile(
		theNormalUserProfileURL,
	);

	if (responseData_profile) {
		normalUserProfile.value = responseData_profile;

		/** Populates/updates the constant that counts the number of followers the normal-user has */
		followers.value = normalUserProfile.value.num_of_followers;
	}
};

onBeforeMount(async () => dataSetup());

/**
 * Makes sure that data made with 'optimistic ui update' is removed. That is to ensure that the numbers doesn't get duplicated
 * upon revisit. This can happen because the pinia store caches it's data. The collision happens because the data get's refetched
 * each time the page is mounted.
 *
 * ? is this wrong?
 */
onDeactivated(() => {
	console.log(
		"The 'onDeactivated' lifecycle hook was run on [id] user (which is weird)",
	); // print to self
	alert(
		"The 'onDeactivated' lifecycle hook was run on [id] user (which is weird)",
	); // alert to self

	followers.value = 0;
	loggedInUserStore.idArrayOfLoggedInUserFollowingUsers = [];
});

/**
 * This makes sure the data mentioned above definetly gets removed.
 */
onUnmounted(() => {
	followers.value = 0;
	loggedInUserStore.idArrayOfLoggedInUserFollowingUsers = [];
});

/**
 * Makes sure that the logged in user can view its OWN normal user page
 *
 * @todo Change this into something smarter, more efficiant
 *
 * Acts as a type of route gard
 *
 * Makes sure that the logged-in user can't access it's own [id]user page.
 */
watchEffect(() => {
	if (normalUserProfile.value) {
		if (normalUserProfile.value?.username === authStore.username) {
			console.log("Can't access it's own [id] user page"); // print to self
			navigateTo("/minkonto");
		}
	}
});

/**
 * Decides what layout the page is going to be rendered with (navbar, footer, etc.).
 */
definePageMeta({
	layout: "default",
});
</script>

<style scoped></style>
