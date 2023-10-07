<template>
	<div v-if="userdata" id="aside" class="h-auto w-full mb-14">

		<div data-test="myprofile" class="w-full">

			<my-profile-card :profilePictureProp="profile_picture">

				<template #username>
					{{ userdata.username }}
				</template>

				<template #full-name>
					{{ full_name }}
				</template>

				<template #amount-of-followers>
					Antall følgere: {{ userdata.num_of_followers }}
				</template>

				<template #amount-of-saved-posts>
					Lagrede innlegg: {{ userdata.num_of_saved_posts }}
				</template>


			</my-profile-card>
		</div>

		<hr class="mb-8">

		<div id="saved-posts" class="mx-auto w-full mb-8">
			<h3 class=" text-[28px] mb-9">
				Lagrede innlegg
			</h3>
			<div class="saved-article" v-if="userdata?.saved_posts">
				<ArticleSavedCard v-for="post, index in userdata.saved_posts" :savedArticleProp="post" :key="index" />
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
			<div id="following" v-if="userdata?.num_of_followers">
				<Following v-for="following, index in userdata.following" :followingProp="following" :key="index" />
			</div>
			<span class="text-xs text-primary hover:text-primaryFixed">Se alle</span>
		</div>

	</div>
</template>

<script setup lang="ts">
import profile_picture from '~/assets/placeholder-profile-picture.png'


const userdata = ref<null | PersonalUserType>(null)
const baseMyUserURL = "http://localhost:8888/api/min-side/"
const full_name = ref("")

onBeforeMount(async () => {

	userdata.value = await fetchPersonalUser(baseMyUserURL)

	full_name.value = `${userdata.value.first_name} ${userdata.value.last_name}`

	console.log(userdata.value.data) // print to self
})

</script>

<style scoped></style>