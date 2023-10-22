<template>
	<div v-if="(store.personalPosts) && (store.personalUser)">
		<div class="py-12 px-8">
			<div class="container mx-auto py-8">
				<div class="grid grid-cols-4 sm:grid-cols-12 gap-12 px-4">
					<div class="col-span-4 sm:col-span-5 xl:col-span-3">
						<div id="wrapper" class="bg-primary rounded-lg p-6">
							<div v-if="store.personalUser" class="px-5 py-5 bg-onPrimary rounded-xl">
								<div class="flex flex-col items-center">
									<img :src="placeholder_profile_picture"
										class="w-32 h-32 bg-onPrimary rounded-full mb-4 shrink-0" alt="Profilbilde">
									<!-- </img> -->
									<h1 class="text-xl text-plain font-bold">
										{{ store.personalUser.first_name }} {{ store.personalUser.last_name }}
									</h1>
									<p class="">
										{{ store.personalUser.username }}
									</p>
									<div class="mt-6 flex flex-wrap gap-4 justify-center">
										<nuxt-link to="/newpost">
											<button
												class="bg-secondary text-onSecondary hover:bg-secondaryFixedDim hover:text-onSecondaryFixed py-2 px-4 rounded">
												Nytt innlegg
											</button>
										</nuxt-link>
										<span
											class="bg-onPrimary border-onPrimaryContainer border-2 text-onPrimaryContainer py-2 px-4 rounded">
											{{ store.personalUser.num_of_followers }} followers
										</span>
										<!-- Figure this out later -->
									</div>
								</div>
								<hr class="my-6 border-t border-2 roundend-sm border-primary">
								<div class="flex flex-col">
									<span class="uppercase font-bold tracking-wider mb-2">Info</span>
									<ul class="">
										<li v-if="store.personalUser.email" class="mb-2 flex">
											<p class="font-bold me-2">
												Epost:
											</p>
											{{ store.personalUser.email }}
										</li>
										<li v-if="store.personalUser.phone_number" class="mb-2">
											<p class="font-bold me-2">
												Tlf.nr:
											</p>
											{{ store.personalUser.phone_number }}
										</li>
										<li v-if="store.personalUser.nickname" class="mb-2">
											<p class="font-bold me-2">
												Kallenavn:
											</p>
											{{ store.personalUser.nickname }}
										</li>
										<li v-if="store.personalUser.address" class="mb-2">
											<p class="font-bold me-2">
												Addresse:
											</p>
											{{ store.personalUser.address }}
										</li>
										<li v-if="store.personalUser.age" class="mb-2">
											<p class="font-bold me-2">
												Alder:
											</p>
											{{ store.personalUser.age }}
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div>
							<div class="items-center pt-2 ms-6">
								<h3 class="text-lg py-3">
									Followers
								</h3>
								<div v-if="store.personalUser.followers">
									<Follower v-for="(f, index) in followers" :key="index" :follower="f" v-once/>
								</div>
								<div v-else>
									<span>No followers</span>
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
								<p v-if="store.personalUser.bio" v-text="store.personalUser.bio"></p>
								<p v-else class="">
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
								All posts by {{ store.personalUser.first_name }}
							</h2>

							<!-- Post begin -->
							<div v-if="store.personalPosts.results">
								<ListMyPosts v-for="post in store.personalPosts.results" :key="post.id"
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
import { useGeneralStore } from '~/store/generalStore';
const store = useGeneralStore()

const followers = ref<FollowerType | null>(null)

onBeforeMount(async () => {
	await getSnippetPostAllLoggedInUser()
})

onBeforeMount(async () => {
	await getLoggedInUserProfile()
})

definePageMeta({
	layout:'default'

})
</script>

<style scoped></style>
