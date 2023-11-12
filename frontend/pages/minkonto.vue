<template>
	<div v-if="(postStore.loggedInUserPosts) && (loggedInUserStore.loggedInUserProfile)">
		<div name="default" class="py-12 px-8">
			<div class="container mx-auto py-8">
				<div class="grid grid-cols-4 sm:grid-cols-12 gap-12 px-4">
					<div class="col-span-4 sm:col-span-5 xl:col-span-3">
						<div id="wrapper" class="bg-primary rounded-lg p-6">
							<div v-if="loggedInUserStore.loggedInUserProfile" class="px-5 py-5 bg-onPrimary rounded-xl">
								<div class="flex flex-col items-center">
									<img id="profile_picture"
										:src="loggedInUserStore.loggedInUserProfile.profile_picture ? loggedInUserStore.loggedInUserProfile.profile_picture : placeholder"
										class="w-32 h-32 bg-onPrimary rounded-full mb-4 shrink-0" alt="Profilbilde">
									<!-- </img> -->
									<h1 class="text-xl text-plain font-bold">
										{{ loggedInUserStore.loggedInUserProfile.first_name }} {{
											loggedInUserStore.loggedInUserProfile.last_name }}
									</h1>
									<p>
										{{ loggedInUserStore.loggedInUserProfile.username }}
									</p>
									<div class="mt-6 flex flex-wrap gap-4 justify-center">

										<span v-if="loggedInUserStore.loggedInUserProfile.num_of_following">{{
											loggedInUserStore.loggedInUserProfile.num_of_following }} following</span>

										<span v-if="loggedInUserStore.loggedInUserProfile.num_of_followers === 1"
											class="bg-onPrimary border-onPrimaryContainer border-2 text-onPrimaryContainer py-2 px-4 rounded">
											{{ loggedInUserStore.loggedInUserProfile.num_of_followers }} follower
										</span>
										<span v-else>
											{{ loggedInUserStore.loggedInUserProfile.num_of_followers }} followers
										</span>
									</div>
								</div>
								
								<hr class="my-6 border-t border-2 roundend-sm border-primary">

								<div id="profile-information">
									<MyProfileInformation />
								</div>
							</div>
						</div>
						<div>
							<div id="following" v-if="loggedInUserStore.loggedInUserProfile.num_of_following != 0"
								class="items-center pt-2 ms-6">
								<h3 class="text-lg py-3">
									You are following:
								</h3>
								<div>
									<Following v-for="(f, index) in loggedInUserStore.idArrayOfLoggedInUserFollowingUsers"
									:key="index" :username="f" />
								</div>
							</div>
						</div>
					</div>
					<div class="col-span-4 sm:col-span-7 xl:col-span-9">
						<div id="bio">
							<MyProfileBio />
						</div>

						<div id="all-posts">
							<MyProfileListArticles />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png'
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

definePageMeta({
	layout:'default'
})

// Declaring stores

const postStore = usePostStore()
const loggedInUserStore = useLoggedInUserStore()

/** If the user doesnt have its own picture, this picture is used instead */
const placeholder = ref(placeholder_profile_picture)

/**
 * Fetches:
 * 
 * 1. POSTS made by the logged in user
 * 
 * 2. USER INFORMATION about the logged in user
 */
onMounted(async () => {
	const loggedInUserURL = "http://localhost:8888/api/min-side/"
	const loggedInUserPostsURL = "http://localhost:8888/api/min-side/posts/"

	await getLoggedInUserAllPostSnippets(loggedInUserPostsURL)
	await getLoggedInUserProfile(loggedInUserURL)
})
</script>

<style scoped></style>
