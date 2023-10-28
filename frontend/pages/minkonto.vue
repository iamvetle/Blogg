<template>
	<div v-if="(postStore.loggedInUserPosts) && (loggedInUserStore.loggedInUserProfile)">
		<div class="py-12 px-8">
			<div class="container mx-auto py-8">
				<div class="grid grid-cols-4 sm:grid-cols-12 gap-12 px-4">
					<div class="col-span-4 sm:col-span-5 xl:col-span-3">
						<div id="wrapper" class="bg-primary rounded-lg p-6">
							<div v-if="loggedInUserStore.loggedInUserProfile" class="px-5 py-5 bg-onPrimary rounded-xl">
								<div class="flex flex-col items-center">
									<img :src="loggedInUserStore.loggedInUserProfile.profile_picture != '' ? loggedInUserStore.loggedInUserProfile.profile_picture : placeholder_profile_picture"
										class="w-32 h-32 bg-onPrimary rounded-full mb-4 shrink-0" alt="Profilbilde">
									<!-- </img> -->
									<h1 class="text-xl text-plain font-bold">
										{{ loggedInUserStore.loggedInUserProfile.first_name }} {{ loggedInUserStore.loggedInUserProfile.last_name }}
									</h1>
									<p class="">
										{{ loggedInUserStore.loggedInUserProfile.username }}
									</p>
									<div class="mt-6 flex flex-wrap gap-4 justify-center">
	
										<span v-if="loggedInUserStore.loggedInUserProfile.bio">{{ loggedInUserStore.loggedInUserProfile.num_of_following }} following</span>

										<span v-if="loggedInUserStore.loggedInUserProfile.num_of_followers === 1"
											class="bg-onPrimary border-onPrimaryContainer border-2 text-onPrimaryContainer py-2 px-4 rounded">
											{{ loggedInUserStore.loggedInUserProfile.num_of_followers }} follower
										</span>
										<span v-else>
											{{ loggedInUserStore.loggedInUserProfile.num_of_followers }} followers
										</span>
										<!-- Figure this out later -->
									</div>
								</div>
								<hr class="my-6 border-t border-2 roundend-sm border-primary">
								<div class="flex flex-col">
									<span class="uppercase font-bold tracking-wider mb-2">Info</span>
									<ul class="">
										<li v-if="loggedInUserStore.loggedInUserProfile.email" class="mb-2 flex">
											<p class="font-bold me-2">
												Epost:
											</p>
											{{ loggedInUserStore.loggedInUserProfile.email }}
										</li>
										<li v-if="loggedInUserStore.loggedInUserProfile.phone_number" class="mb-2">
											<p class="font-bold me-2">
												Tlf.nr:
											</p>
											{{ loggedInUserStore.loggedInUserProfile.phone_number }}
										</li>

										<li v-if="loggedInUserStore.loggedInUserProfile.address" class="mb-2">
											<p class="font-bold me-2">
												Addresse:
											</p>
											{{ loggedInUserStore.loggedInUserProfile.address }}
										</li>
										<li v-if="loggedInUserStore.loggedInUserProfile.date_of_birth" class="mb-2">
											<p class="font-bold me-2">
												Fødselsdato:
											</p>
											{{ loggedInUserStore.loggedInUserProfile.date_of_birth }}
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div>
							<div v-if="loggedInUserStore.loggedInUserProfile.num_of_following != 0" class="items-center pt-2 ms-6">
								<h3 class="text-lg py-3">
									You are following:
								</h3>
								<div>
									<Following v-for="(f, index) in loggedInUserStore.idArrayOfLoggedInUserFollowingUsers" :key="index" :username="f"/>
								</div>
							</div>
						</div>
					</div>
					<div class="col-span-4 sm:col-span-7 xl:col-span-9">
						<div class="bg-primary rounded-lg p-6">
							<div class="px-5 py-7 bg-onPrimary border-primary border rounded-md">
								<h2 class="text-xl font-bold mb-4">
									Bio
								</h2>
								<p v-if="loggedInUserStore.loggedInUserProfile.bio" v-text="loggedInUserStore.loggedInUserProfile.bio"></p>
								<p v-else id="placeholder-bio">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
									finibus est vitae tortor ullamcorper, ut vestibulum velit
									convallis. Aenean posuere risus non velit egestas suscipit. Nunc
									finibus vel ante id euismod. Vestibulum ante ipsum primis in
									faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
									erat volutpat. Nulla vulputate pharetra tellus, in luctus risus
									rhoncus id.
								</p>
							</div>

							<h2 class="text-xl text-onPrimary font-bold mt-8 mb-6">
								All posts by {{ loggedInUserStore.loggedInUserProfile.first_name }}
							</h2>

							<!-- Post begin -->
							<div v-if="postStore.loggedInUserPosts.results">
								<ListMyPosts v-for="post in postStore.loggedInUserPosts.results" :key="post.id"
									:post-prop="post" />
							</div>
							<!-- Post end -->
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

const postStore = usePostStore()
const loggedInUserStore = useLoggedInUserStore()

/**
 * Fetches all of the posts (in snippets) made by the logged in user.
 * 
 * ALso fetches all user profile information by the logged in user.
 */
onMounted(async () => {
	await getLoggedInUserAllPostSnippets()
	await getLoggedInUserProfile()

})

definePageMeta({
	layout:'default'

})
</script>

<style scoped></style>
