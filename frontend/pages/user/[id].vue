<template>
	<div id="site-wrapper">
		<div v-if="(normalUserProfile != null) && (normalUserPosts != null)" class="w-9/12 mx-auto border-v pb-[60px]">

			<!-- 12/12 Grid col-->
			<div class="w-full px-[80px] grid grid-cols-12 gap-[80px]">

				<!-- 8/12 Main content-->
				<div class="inline-block col-start-1 col-end-9 border-v border-blue-500">
					<img id="header" :src="placeholder_header_image"
						class="h-[150px] w-full object-cover border-v border-slate-500">

					<div id="top" class="px-2 pt-[50px]">
						<div id="heading" class="prose">
							<h2 class="text-4xl leading-[52px] font-medium tracking-[-0.03em]">
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

					<div id="main" class="pt-[50px]" v-if="normalUserPosts.results">

						<div class="article" v-for="post in normalUserPosts.results" :key="post.id">

							<article-card :hide-profile-image="true">

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
									<span class="cursor-pointer text text-primary hover:text-primaryFixed"
										@click="redirect_to_post_page(post.id)">
										Les mer
									</span>
								</template>

								<template #tags v-if="post.tags">
									<span>
										<BaseTag v-for="tag in post.tags" :key="post.id" :text-prop="tag" class="me-1" />
									</span>
								</template>

								<template #save-article-icon v-if="post.id">

									<BaseIconSaveArticleSaved v-if="checkIfPostIsSaved(post.id)" @click="unsave(post.id)" />

									<BaseIconSaveArticleUnSaved v-else @mouseover="color = 'fill-primary'"
										@mouseleave="color = 'fill-black'" @click="save(post.id)" :fill-color="color" />

								</template>

								<template #more-options-icon v-if="post.id">
									<BaseIconMoreOptions widthProp="24" heightProp="24" :colorProp="color"
										@mouseover="color = 'fill-primary'" @mouseleave="color = 'fill-black'" />
								</template>

								<template #article_image v-if="post.id">
									<img :src="post_image" alt="Bilde til artikkel" class="w-full h-auto">
								</template>

							</article-card>


							<hr class="mb-16">
						</div>
					</div>
				</div>

				<!-- 4/12 sidebar -->
				<div id="sidebar" class="relative px-5 col-span-4 border-v border-red-500">

					<div>
						<the-user-sidebar :username="normalUserProfile.username">

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

							<template #follow-button>
								<base-follow-button>

									<div class="w-fit h-fit cursor-pointer bg-primary text-onPrimary hover:bg-inversePrimary p-1 rounded-md"
										v-if="checkIfFollowingUser(normalUserProfile.username) === true" id="following"
										@click="unFollowUser(normalUserProfile.username)"
										@mouseover="followText = 'Unfollow'" @mouseleave="followText = 'Following'">
										<p>{{ followText }}</p>
									</div>

									<div class="w-fit h-fit cursor-pointer p-1 rounded-md bg-inversePrimary text-onPrimary hover:bg-primary"
										v-if="checkIfFollowingUser(normalUserProfile.username) === false" id="follow"
										@click="followUser(normalUserProfile.username)">
										<p>Follow</p>
									</div>

								</base-follow-button>
							</template>

						</the-user-sidebar>
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
const followText = ref("Following")

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
		await getLoggedInUserProfile();
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
	const response_profile = await getNormalUserProfile(theNormalUserProfileURL);

	normalUserProfile.value = response_profile?.data

	/** Populates/updates the constant that counts the number of followers the normal-user has */
	followers.value = normalUserProfile.value.num_of_followers

	const theNormalUserPostsURL = `http://localhost:8888/api/${username}/posts/`
	
	/**
	 * Fetches the posts the user has made through the API address of the user.
	 * And puts them in a reactive variable.
	 * 
	 * 
	 * @param theNormalUserPostsURL The URL address that the function is going to fetch from.
	 */
	const response_user_posts = await getNormalUserPosts(theNormalUserPostsURL);

	normalUserPosts.value = response_user_posts?.data
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
 * Unfollows the user
 * 
 * @param username The username of the user that is going to be unfollowed
 */
const unFollowUser = async (username: string) => {
	const theNormalUserProfileUnfollowURL = `http://localhost:8888/api/${username}/unfollow/`;

	const response: any = await getUnfollowUser(theNormalUserProfileUnfollowURL)

	// Makes sure that no changes are made if the request was not successfull
	if (response.status !== 200) {
		return null
	}

	const index = loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.findIndex((id) => id === username)

	loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.splice(index, 1)

	/** Decrements the number of followers the user has */
	followers.value--

}

/**
 * Follows the user
 * 
 * @param username The username of the user that is going to be followed
 */
const followUser = async (username: string) => {
	const theNormalUserProfileFollowURL = `http://localhost:8888/api/${username}/follow/`;

	const response: any = await getFollowUser(theNormalUserProfileFollowURL)

	// Makes sure that no changes are made if the request was not successfull
	if (response.status !== 200) {
		return null
	}

	loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.push(username)

	/** Increases the number of followers the user has */
	followers.value++
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
 * Decides what layout the page is going to be rendered with (navbar, footer, etc.). 
 */
definePageMeta({
	layout: "default"
})

</script>

<style scoped></style>