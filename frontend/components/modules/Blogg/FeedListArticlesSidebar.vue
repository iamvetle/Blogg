<template>
	<div v-if="loggedInUserStore.loggedInUserProfile" id="aside" class="h-auto w-full mb-14">

		<div data-test="myprofile" class="w-full">

			<logged-in-user-profile-card class="w-full" :profile-picture-prop="loggedInUserStore.loggedInUserProfile.profile_picture ? loggedInUserStore.loggedInUserProfile.profile_picture : profile_picture">

				<template #username v-if="loggedInUserStore.loggedInUserProfile.username">
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

			<!-- <div class="saved-article" v-if="loggedInUserStore.loggedInUserProfile.saved_posts">
				<ArticleSavedCard v-for="post in loggedInUserStore.loggedInUserProfile.saved_posts" :saved-post="post"
					:key="post.post.id" />
			</div> -->

			<div id="saved_articles" v-for="post in loggedInUserStore.loggedInUserProfile.saved_posts">
				<article-saved-card :key="post.post.id">

					<template #title>
						<span @click="redirect_to_post_page(post.post.id)" data-test="redirect_to_author" class="cursor-pointer">{{ post.post.title
						}}</span>
					</template>

					<template #author>
						<span @click="redirect_to_author_page(post.post.username)" data-test="redirect_to_post" class="cursor-pointer">{{ post.post.username
						}}</span>
					</template>

				</article-saved-card>
			</div>

			<p v-if="loggedInUserStore.loggedInUserProfile.num_of_saved_posts != 0" class="-mt-2 text-xs text-primary hover:text-primaryFixed">
				<!-- Se alle ({{ loggedInUserStore.loggedInUserProfile.num_of_saved_posts }}) -->
			</p>
			<p v-else>
				Du har ingen lagrede innlegg
			</p>

		</div>

		<hr class="mb-8">

		<div id="following-card" class="mx-auto w-full">

			<div v-if="loggedInUserStore.loggedInUserProfile.num_of_following != 0">
				<h3 class="text-[28px] mb-9">
					Du følger
				</h3>
				<div id="following">
					<Following v-for="(following, index) in loggedInUserStore.loggedInUserProfile.following" :username="following.username"
						:key="index" />
				</div>
				<!-- <span class="text-xs text-primary hover:text-primaryFixed">
					Se alle ({{ loggedInUserStore.loggedInUserProfile.num_of_following}})
				</span> -->
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


const redirect_to_post_page = (postId: any) => {

	return navigateTo(`/post/${postId}`)
}

const redirect_to_author_page = (username: any) => {

	return navigateTo(`/user/${username}`)
}

</script>

<style scoped></style>