<template>
	<div v-if="post" class="max-w-2xl py-[100px] mx-auto prose">
		<div>
			<span class="flex items-center justify-between">
				<span class="flex items-center not-prose">
					<BaseImage :src="placeholder_profile_picture" alt="" class="mr-2 h-8" />
					<NuxtLink :to="authorProfilePage">
						<p class="font-bold inline">
							- {{ post.author.first_name }} {{ post.author.last_name }}
						</p>
					</NuxtLink>
				</span>
				<span class="text-xs float-right">Published {{ post.date_published }}</span>
			</span>
		</div>

		<hr>

		<div data-test="post_title" id="title">
			<PostTitle :title="post.title" />
		</div>

		<!-- 1. Can't be the logged in user. 2. Can't be not logged in -->
		<span v-if="!checkIfLoggedInUser(post.author.username) && authStore.isAuthenticated">
			<PostBookmark :post="post.id" />
		</span>


		<div>
			<div id="all_tags" v-if="post.tags">
				<TagsList :tags="post.tags" />
			</div>
		</div>

		<div id="main-content" data-test="html_rendered_content">
			<PostContentHTML :html="post.content" class="break-words"/>
		</div>

		<div class="mb-4">
			<NuxtLink to="/">
				<BaseButton text="Back" class="border-2 bg-light-blue-400" />
			</NuxtLink>
		</div>

		<hr>

		<div data-test="comments" id="post_comments">
			<SinglePostComments :post="post" />
		</div>
	</div>
</template>

<script setup lang="ts">

/**
 * This the user page that each (normal) user has.
 * 
 * It displays user-information, and the posts made by that user.
 * 
 * 
 * ? I do not want the post id to be what is going to be displayed in the url
 * ? Is slug the way to go? - and what is that?
 */

// import noimage from '~/assets/noimage.jpg'
import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png';
definePageMeta({
	layout: 'default'
})

const authStore = useAuthStore()

const post = ref<PostSingleType | null>(null);

/** Computed value of all of the "actual" comments in the poststore */
const route = useRoute()
const postRoute = (route.params.id).toString()

const authorProfilePage = ref("")

const loggedInUserStore = useLoggedInUserStore()

const fetchPostRelated = async () => {
	console.log(route.params.id)
	const postURL = urls.api.posts.singlePost.view(postRoute);


	/** The actual fetch, that fetches one post */
	post.value = await getSinglePost(postURL);

	/** The username of the author of the post */
	const username = post.value?.author.username ?? ""

	/** The appropriate link to the author user profile page */
	authorProfilePage.value = `/user/${username}` ?? ""

	const commentsURL = urls.api.posts.singlePost.comments(postRoute)
	await getSinglePostComments(commentsURL)

	/**
	 * Only checks this if the web client is authenticated
	 */
	if (authStore.isAuthenticated) {
		/**
	 * I need to fetch this to be able to check if I am following the user
	 * 
	 * Checks if the pinia store already has information about whom the logged-in user is following. 
	 */
		if (!Array.isArray(loggedInUserStore.idArrayOfLoggedInUserFollowingUsers) || !loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.length) {
			await getLoggedInUserProfile(urls.users.myUser.profile);
		}

	}
};

onBeforeMount(async() =>await fetchPostRelated())



</script>


<style scoped></style>