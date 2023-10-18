<template>
	<div v-if="store.personalUser" id="aside" class="h-auto w-full mb-14">

		<div data-test="myprofile" class="w-full">

			<my-profile-card :profile-picture-prop="profile_picture">

				<template #username v-if="store.personalUser.username">
					{{ store.personalUser.username }}
				</template>

				<template #full-name v-if="full_name">
					{{ full_name }}
				</template>

				<template #amount-of-followers>
					<span v-if="store.personalUser.num_of_followers">
						Antall følgere: {{ store.personalUser.num_of_followers }}
					</span>
					<span v-else>
						Du har ingen følgere
					</span>
				</template>

				<template #amount-of-saved-posts>

					<span v-if="store.personalUser.num_of_saved_posts">
						Innlegg lagret: {{ store.personalUser.num_of_saved_posts }}
					</span>

					<span v-else>
						Innlegg lagret: 0
					</span>
				</template>

			</my-profile-card>
		</div>

		<hr class="mb-8">

		<div id="saved-posts" class="mx-auto w-full mb-8">

			<h3 class=" text-[28px] mb-9">
				Lagrede innlegg
			</h3>

			<div class="saved-article" v-if="store.personalUser.saved_posts">
				<ArticleSavedCard v-for="post in store.personalUser.saved_posts" :saved-article-prop="post"
					:key="post.id" />
			</div>

			<p v-if="store.personalUser.num_of_saved_posts != 0" class="-mt-2 text-xs text-primary hover:text-primaryFixed">
				Se alle ({{ store.personalUser.num_of_saved_posts }})
			</p>
			<p v-else>
				Du har ingen lagrede innlegg
			</p>

		</div>

		<hr class="mb-8">

		<div id="following-card" class="mx-auto w-full">

			<div v-if="store.personalUser.num_of_following != 0">
				<h3 class="text-[28px] mb-9">
					Du følger
				</h3>
				<div id="following">
					<Following v-for="(following, index) in store.personalUser.following" :username="following.username"
						:key="index" />
				</div>
				<span class="text-xs text-primary hover:text-primaryFixed">Se alle ({{ store.personalUser.num_of_following }})</span>
			</div>

			<div v-if="store.personalUser.num_of_following == 0">
				<h3>Du følger ingen</h3>
			</div>

		</div>

	</div>
</template>

<script setup lang="ts">

import profile_picture from '~/assets/placeholder-profile-picture.png'
import { useGeneralStore } from '~/store/generalStore';

const store = useGeneralStore()

/**
 * Either returns the full name of the user, or returns only the username (which is not supposed to actually happen)
 */
const full_name = computed(() => {
	let name = `${store.personalUser.first_name} ${store.personalUser.last_name}`

	if (name.trim() == "") {
		return null
	} else {
		return name
	}
})

</script>

<style scoped></style>