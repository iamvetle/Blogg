<template>
	<div v-if="loggedInUserStore.loggedInUserProfile" id="aside" class="h-auto w-full mb-14">

		<div data-test="myprofile" class="w-full">

			<logged-in-user-profile-card class="w-full">

				<template #profile_picture v-if="loggedInUserStore.loggedInUserProfile">
					<img data-test="imgprop" :src="profilePicture" class="w-20 h-auto text-onPrimaryContainer mr-4">
				</template>

				<template	 #username v-if="loggedInUserStore.loggedInUserProfile.username">
					{{ loggedInUserStore.loggedInUserProfile.username }}
				</template>

				<template #full-name v-if="full_name">
					{{ full_name }}
				</template>

				<template #amount-of-followers>
					<span v-if="loggedInUserStore.loggedInUserProfile.num_of_followers">
						Antall følgere: {{ loggedInUserStore.loggedInUserProfile.num_of_followers }}
					</span>
					<span v-else>
						Du har ingen følgere
					</span>
				</template>

				<template #amount-of-saved-posts>

					<span v-if="loggedInUserStore.loggedInUserProfile.num_of_saved_posts">
						Innlegg lagret: {{ loggedInUserStore.loggedInUserProfile.num_of_saved_posts }}
					</span>

					<span v-else>
						Innlegg lagret: 0
					</span>
				</template>
			</logged-in-user-profile-card>
		</div>

		<hr class="mb-8">

		<div id="saved-posts" class="mx-auto w-full mb-8">

			<h3 class=" text-[28px] mb-9">
				Lagrede innlegg
			</h3>

			<div id="saved_articles">
				<PostSavedCardList />
			</div>
		</div>

		<hr class="mb-8">

		<div id="following-card" class="mx-auto w-full">

			<div v-if="loggedInUserStore.loggedInUserProfile.num_of_following != 0">
				<h3 class="text-[28px] mb-9">
					Du følger ({{ loggedInUserStore.loggedInUserProfile.num_of_following }})
				</h3>
				<div id="following">
					<span v-for="following in loggedInUserStore.loggedInUserProfile.following">
						<Following :following="following.username" :key="following.username" />
					</span>
				</div>

			</div>

			<div v-if="loggedInUserStore.loggedInUserProfile.num_of_following == 0">
				<h3>Du følger ingen</h3>
			</div>

		</div>

	</div>
</template>

<script setup lang="ts">

import profile_picture from '~/assets/placeholder-profile-picture.png'
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

const loggedInUserStore = useLoggedInUserStore()


/**
 * Either returns the full name of the user, or returns only the username (which is not supposed to actually happen)
 */
const full_name = computed(() => {
	let name = `${loggedInUserStore.loggedInUserProfile.first_name} ${loggedInUserStore.loggedInUserProfile.last_name}`

	if (name.trim() == "") {
		return null
	} else {
		return name
	}
})

const profilePicture = computed(() => {
	if (loggedInUserStore.loggedInUserProfile.profile_picture) {
		return loggedInUserStore.loggedInUserProfile.profile_picture
	} else {
		return profile_picture
	}

})

</script>

<style scoped></style>