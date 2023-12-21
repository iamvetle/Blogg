<template>
	<div v-if="(postStore.loggedInUserPosts) && (loggedInUserStore.loggedInUserProfile)">
		<div name="default" class="py-12 px-8">
			<div class="container mx-auto py-8">
				<div class="grid grid-cols-4 sm:grid-cols-12 gap-12 px-4">
					<div class="col-span-4 sm:col-span-5 xl:col-span-3">
						<div id="wrapper" class="bg-primary rounded-lg p-6">
							<div class="px-5 py-5 bg-onPrimary rounded-xl">
								<div class="flex flex-col items-center">

									<div id="profile_picture_upload">
										<MyProfilePicture />
									</div>


									<div data-test="logged-in-user-name">
										<MyProfileName class="text-xl text-plain font-bold" />
									</div>

									<div id="username">
										<MyProfileUsername />
									</div>

									<div
										class="mt-6 bg-primary text-onPrimary border-primary border rounded-md p-1 flex flex-wrap gap-4 justify-center">
										<MyProfileNumOfFollowers />
									</div>

									<div
										class="mt-6 bg-primary text-onPrimary border-primary border rounded-md p-1 flex flex-wrap gap-4 justify-center">
										<MyProfileNumOfFollowing />
									</div>

								</div>

								<hr class="my-6 border-t border-2 roundend-sm border-primary">

								<div id="profile-information">
									<MyProfileInformation />
								</div>

								<hr>

								<div id="saved_articles">
									<div class="prose">
										<h3>List of saved posts:</h3>
									</div>
									<PostSavedCardList />
								</div>
							</div>
						</div>
						<div>
							<div class="mt-4" id="following">
								<div>
									<span class="prose">
										<h3>You are following:</h3>
									</span>
									<MyProfileFollowing v-if="loggedInUserStore.loggedInUserProfile.num_of_following"
										class="items-center pt-2 ms-6" />
									<span v-else>Nobody.</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Main 9/12  -->
					<div class="col-span-4 sm:col-span-7 xl:col-span-9">
						<div data-test="bio">
							<MyProfileBio @bio-update="updateBio" />
						</div>
						<div id="all-posts">
							<MyProfilePostsList />
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * ! if there are more than 10 posts not all get fetched
 * ! this is because of pagination on the backend
 */
// Declaring stores

const postStore = usePostStore()
const loggedInUserStore = useLoggedInUserStore()

const loggedInUserURL = urls.users.myUser.profile
const loggedInUserPostsURL = urls.api.posts.myuser
definePageMeta({
	layout: 'default',
	middleware:["auth-guard"]
})

/**
 * Fetches:
 * 
 * 1. POSTS made by the logged in user
 * 
 * 2. USER INFORMATION about the logged in user
 */
onBeforeMount(async () => {

	await getLoggedInUserAllPostSnippets(loggedInUserPostsURL)
	await getLoggedInUserProfile(loggedInUserURL)
})

/**
 * Calls a composable that fetches new "my profile information"
 */

const updateBio = async (bioInput: string) => {

	const formData = {
		bio: bioInput
	}

	const response = await patchLoggedInUserBio(loggedInUserURL, formData)

	if (response == null) {
		console.error("Failed to fetch logged-in user profile information")
		return
	} else {
		const response = await getLoggedInUserProfile(loggedInUserURL)

		if (response == null) {
			console.error("Failed to fetch logged-in user profile information")
		}
	}

	/**
	 * Fetches all user information instead of JUST the bio
	 * TODO ^ unpractical - find a new way to deal with it
	 */


}




</script>

<style scoped></style>
