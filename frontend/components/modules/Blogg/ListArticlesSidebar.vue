<template>
	<div v-if="store.personalUser" id="aside" class="h-auto w-full mb-14">

		<div data-test="myprofile" class="w-full">

			<my-profile-card :profilePictureProp="profile_picture">

				<template #username>
					{{ store.personalUser.username }}
				</template>

				<template #full-name>
					{{ full_name }}
				</template>

				<template #amount-of-followers>
					Antall følgere: {{ store.personalUser.num_of_followers }}
				</template>

				<template #amount-of-saved-posts>
					Lagrede innlegg: {{ store.personalUser.num_of_saved_posts }}
				</template>


			</my-profile-card>
		</div>

		<hr class="mb-8">

		<div id="saved-posts" class="mx-auto w-full mb-8">
			<h3 class=" text-[28px] mb-9">
				Lagrede innlegg
			</h3>
			<div class="saved-article" v-if="store.personalUser?.saved_posts">
				<ArticleSavedCard v-for="post, index in store.personalUser.saved_posts" :savedArticleProp="post" :key="index" />
			</div>
			<p class="-mt-2 text-xs text-primary hover:text-primaryFixed">
				Se alle
			</p>
		</div>

		<hr class="mb-8">

		<div id="following-card" class="mx-auto w-full">
			<h3 class="text-[28px] mb-9">
				Du følger
			</h3>
			<div id="following" v-if="store.personalUser?.num_of_followers">
				<Following v-for="following, index in store.personalUser.following" :followingProp="following" :key="index" />
			</div>
			<span class="text-xs text-primary hover:text-primaryFixed">Se alle</span>
		</div>

	</div>
</template>

<script setup lang="ts">

import profile_picture from '~/assets/placeholder-profile-picture.png'
import { useGeneralStore } from '~/store/generalStore';


const full_name = ref("")
const store = useGeneralStore()

onBeforeMount(async () => {

	await fetchPersonalUser()

	// full_name.value = `${store.personalUser.value.first_name} ${store.personalUser.value.last_name}`

	// console.log(store.personalUser.value.data) // print to self
})

</script>

<style scoped></style>