<template>
	<div id="site-wrapper">
		<div v-if="(normalUserProfile != null) && (normalUserPosts != null)" class="w-9/12 mx-auto border-v pb-[60px]">

			<!-- 12/12 Grid -->
			<div class="w-full px-[80px] grid grid-cols-12 gap-[80px]">

				<!-- 8/12 Main content-->
				<div class="inline-block col-start-1 col-end-9 border-v border-blue-500">
					<!-- Profile Image -->
					<img id="header" :src="placeholder_header_image"
						class="h-[150px] w-full object-cover border-v border-slate-500">

					<div id="top" class="px-2 pt-[50px]">
						<div id="heading" class="prose">
							<h2 class="text-4xl leading-[52px] font-medium tracking-[-0.03em]">
								<!-- First name and last name -->
								{{ normalUserProfile.first_name }} {{ normalUserProfile.last_name }}
							</h2>
						</div>

						<div id="nav" class="pt-[30px]">
							<ul class="flex justify-start items-center space-x-4">
								<li class="prose">
									Home
								</li>
								<li class="prose">
									Links
								</li>
								<li class="prose">
									About
								</li>
							</ul>
						</div>
						<hr class="mt-2">
					</div>

					<!-- Start: All posts -->
					<div id="main" class="pt-[50px]" v-if="normalUserPosts.results">

						<div class="article" v-for="post in normalUserPosts.results" :key="post.id">

							<feed-post-preview-card :hide-profile-image="true">

								<template #author v-if="post.author">
									<span>
										<p class="font-bold" v-text="author_full_name(post.author)">
										</p>
									</span>
								</template>

								<template #date_published v-if="post.date_published">
									<span>
										<p class="font-light" v-text="post.date_published"></p>
									</span>
								</template>

								<template #title v-if="post.title">
									<span @click="redirect_to_post_page(post.id)" class="cursor-pointer">
										<h3 class="text-[28px] mb-2" v-text="post.title">
										</h3>
									</span>
								</template>

								<template #content v-if="post.content_snippet">
									<p class="mb-2" v-text="toPlainText(post.content_snippet)">
									</p>
								</template>


								<template #lesmer v-if="post.id">
									<span class="cursor-pointer text-primary hover:text-primaryFixed"
										@click="redirect_to_post_page(post.id)">
										Les mer
									</span>
								</template>

								<template #tags v-if="post.tags">
									<span class="me-1" v-for="tag in post.tags">
										<BaseTag :key="post.id" :text="tag.name" />
									</span>
								</template>

								<template #amount-of-comments v-if="post.num_of_comments !== null">
									<span>{{ post.num_of_comments }} comments</span>
								</template>


								<!-- Save/unsave article icon -->
								<template #save-article-icon v-if="post.id">
									<BaseIconSaveArticleSaved v-if="checkIfPostIsSaved(post.id)" @click="unsave(post.id)" />
									<BaseIconSaveArticleUnSaved v-else @mouseover="color = 'fill-primary'"
										@mouseleave="color = 'fill-black'" @click="save(post.id)" :fill-color="color" />
								</template>

								<!-- More options Icon -->
								<template #more-options-icon v-if="post.id">
									<BaseIconMoreOptions widthProp="24" heightProp="24" :colorProp="color"
										@mouseover="color = 'fill-primary'" @mouseleave="color = 'fill-black'" />
								</template>

								<!-- Article Image -->
								<template #article_image v-if="post.id">
									<img :src="post_image" alt="Bilde til artikkel" class="w-full h-auto">
								</template>

							</feed-post-preview-card>


							<hr class="mb-16">
						</div>
					</div>
					<!-- End -->


				</div>


				<!-- 4/12 Sidebar -->
				<div id="sidebar" class="relative px-5 col-span-4 border-v border-red-500">
					<div>
						<!--/** If the user has a profile picture that one is displayed. If not, the temporary one is displayed. */-->
						<user-sidebar :username="normalUserProfile.username"
							:profile-picture="normalUserProfile.profile_picture ? normalUserProfile.profile_picture : ''">

							<template #amount-of-followers>
								<div class="font-light text-sm leading-7">
									<p v-if="followers === 1">
										{{ followers }} follower
									</p>
									<p v-else>
										{{ followers }} followers
									</p>
								</div>
							</template>

							<!-- Button to follow -->
							<template #follow-button>
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
	</div>
</template>

<script setup lang="ts">

import placeholder_header_image from '~/assets/placeholder-image.jpg'
import { useLoggedInUserStore } from '~/store/loggedInUserStore';


/**
 * User Page
 * 
 * This page is dedicated for the profile of each user, and displays their posts, profile information, 
 * and following status, in addition to the ability to follow and unfollow the user.
 * 
 * It fetches data from two API endpoints to retrieve information user profile information, and the posts
 * that the user has made. It compares the followers the user has against the whom the logged in user is following.
 */

const loggedInUserStore = useLoggedInUserStore()
const route = useRoute();

/** Stores the color that the bookmark icon is rendered with. */
const color = ref("fill-black")

/** Stores all of the user profile information */
const normalUserProfile = ref<NormalUserProfileType | null>(null);

/** Stores all of the posts made by the user */
const normalUserPosts = ref<NormalUserSnippetPostType | null>(null);

/** Represents the text that is going to be displayed on the (un)follow button */


/** Has the **number count** of users that the (normal)user has */
const followers = ref(0)

/**
 * @todo remove this and add the proper pictures made with the post
 * Stores the image that is temporarly being used with each post. The picture from the URL changes dynamically upon each request. 
 */
const post_image = ref('https://picsum.photos/500/300')

/** 
 * Takes the HTML input and returns the pure text version of it.
 * 
 * @param raw The raw HTML to be converted
 * @returns The plain text version
 */
const toPlainText = (raw: string) => {
	const div = document.createElement('div')
	div.innerHTML = raw
	return div.textContent || div.innerText
}

onMounted(async () => {
	/**
	 * Checks if the pinia store already has information about whom the logged-in user is following. 
	 */
	if (!Array.isArray(loggedInUserStore.idArrayOfLoggedInUserFollowingUsers) || !loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.length) {
		await getLoggedInUserProfile("http://localhost:8888/api/min-side/");
	}

	/**
	 * @param id The username of the user profile page
	 */
	const username = route.params.id

	const theNormalUserProfileURL = `http://localhost:8888/api/${username}/`;

	/**
	 * Fetches the profile data about the user through the API address of the user.
	 * 
	 * @param theNormalUserProfileURL The URL address that the function is going to fetch from.
	 */
	const responseData_profile = await getNormalUserProfile(theNormalUserProfileURL);

	if (responseData_profile) {
		normalUserProfile.value = responseData_profile

		/** Populates/updates the constant that counts the number of followers the normal-user has */
		followers.value = normalUserProfile.value.num_of_followers
	}

	const theNormalUserPostsURL = `http://localhost:8888/api/${username}/posts/`

	/**
	 * Fetches the posts the user has made through the API address of the user.
	 * And puts them in a reactive variable.
	 * 
	 * @param theNormalUserPostsURL The URL address that the function is going to fetch from.
	 */
	const responseData_posts = await getNormalUserPosts(theNormalUserPostsURL);

	if (responseData_posts) {
		normalUserPosts.value = responseData_posts
	}
})

/**
 * Navigates, or redirects, the web client to the
 * specific page for the post
 * 
 * @param post - the id of the post
 */
const redirect_to_post_page = async (post: any) => {
	const post_article_page = post

	return await navigateTo(`/post/${post_article_page}`)
}

/**
 * Makes a full name variable of the user
 * 
 * @param author The author of each post (will always be the same)
 * 
 * @returns Either the complete name of the user. Or just the username 
 */
const author_full_name = (author: any) => {

	// This is only really relevant to 'Iamvetle' user. If the user doesn't have a first name or last name, the username is instead returned // PRINT TO SELF remove later
	if (author.first_name && author.last_name) {
		const full = `${author.first_name} ${author.last_name}` ?? author.username
		return full
	} else {
		return author.username
	}

}

/**
 * Unsaves the post from the logged-in user
 * 
 * @param post The post to unsave
 */
const unsave = async (post: number) => {
	const index = loggedInUserStore.idArrayOfSavedPosts.findIndex((id) => id === post)

	loggedInUserStore.idArrayOfSavedPosts.splice(index, 1)

	await getSaveOrUnsavePost(post)
}

/**
 * Saves the post for the logged-in user
 * 
 * @param post The post to be saved
 */
const save = async (post: number) => {

	await getSaveOrUnsavePost(post) // i have to put in a logic that makes it not possible to save a post - it  cancesl if hte status code is not 200
}

/**
 * Makes sure that data made with 'optimistic ui update' is removed. That is to ensure that the numbers doesn't get duplicated
 * upon revisit. This can happen because the pinia store caches it's data. The collision happens because the data get's refetched
 * each time the page is mounted. 
 */
onDeactivated(() => {
	followers.value = 0
	loggedInUserStore.idArrayOfLoggedInUserFollowingUsers = []
})

/**
 * This makes sure the data mentioned above definetly gets removed.
 */
onUnmounted(() => {
	followers.value = 0
	loggedInUserStore.idArrayOfLoggedInUserFollowingUsers = []
})


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
		const localUsername = localStorage.getItem("username")
		if (normalUserProfile.value.username === localUsername) {
			console.log("Can't access it's own [id] user page") // print to self

			navigateTo("/minkonto")
		}
	}
})

/**
 * Decides what layout the page is going to be rendered with (navbar, footer, etc.). 
 */
definePageMeta({
	layout: "default"
})

</script>

<style scoped></style>