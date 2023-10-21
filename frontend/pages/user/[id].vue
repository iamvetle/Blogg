<template>
	<div id="site-wrapper">
		<div v-if="(normalUserProfile != null) && (normalUserPosts != null)" class="w-9/12 mx-auto border-v pb-[60px]">
			<div class="w-full px-[80px] grid grid-cols-12 gap-[80px]">
				<div class="inline-block col-start-1 col-end-9 border-v border-blue-500">
					<!-- 8/12 main content-->

					<img id="header" :src="placeholder_header_image"
						class="h-[150px] w-full object-cover border-v border-slate-500">
					<!-- The IMAGE -->

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
										<p class="font-bold" v-text="author_full_name(post)">
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
					<div class="sticky top-0 overflow-y-scroll" v-if="normalUserProfile != null">

						<the-user-sidebar :username="normalUserProfile.username">

							<template #amount-of-followers>
								<p class="font-light text-sm leading-7">
									{{ followers }} followers
								</p>	
							</template>

							<template #follow-button>

								<base-follow-button>
									<span class="w-fit h-fit cursor-pointer"
										v-if="checkIfFollowingUser(normalUserProfile.username) === true" id="following"
										@click="unFollowUser(normalUserProfile.username)">
										<p>Following</p>
									</span>

									<span class="w-fit h-fit cursor-pointer"
										v-if="checkIfFollowingUser(normalUserProfile.username) === false" id="follow"
										@click="followUser(normalUserProfile.username)">
										<p>Follow</p>
									</span>

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
// a user's page

import placeholder_header_image from '~/assets/placeholder-image.jpg'
// import UserPostCard from '~/components/modules/Blogg/UserPostCard.vue';
import { useGeneralStore } from '~/store/generalStore';
// import Following from '~/components/modules/MyUser/Following.vue';
const post_image = ref('https://picsum.photos/500/300')

/** Essentially 'dumps' the input into a div and returns the plain text */
const toPlainText = (raw: string) => {
	const div = document.createElement('div')
	div.innerHTML = raw
	return div.textContent || div.innerText
}

const store = useGeneralStore()

const color = ref("fill-black")
const route = useRoute();
const theNormalUserProfileURL = `http://localhost:8888/api/${route.params.id}/`;

const theNormalUserPostsURL = `http://localhost:8888/api/${route.params.id}/posts/`;

const normalUserProfile = ref<NormalUserProfileType | null>(null);
const normalUserPosts = ref<NormalUserSnippetPostType | null>(null);

const followers = ref(0)


/**
 * Fetches, GET, the profile information about the user
 */
onMounted(async () => {
	const response = await getNormalUserProfile(theNormalUserProfileURL);
	await getLoggedInUserProfile();

	followers.value = response.num_of_followers

	console.log(response)

	normalUserProfile.value = response
})

/**
 * Fetches, GET, posts the user has made
 */
onMounted(async () => {
	const response = await getNormalUserPosts(theNormalUserPostsURL);


	normalUserPosts.value = response
})

/**
 * Navigates, or redirects, the web client to the
 * specific page for the post
 * @param post - the id of the post
 */
const redirect_to_post_page = async (post: any) => {
	const post_article_page = post

	return await navigateTo(`/post/${post_article_page}`)
}



const author_full_name = (post: SnippetPostSingleType) => {

	const author = post.author

	if (author.first_name && author.last_name) {
		const full = `${author.first_name} ${author.last_name}` ?? author.username
		return full
	} else {
		return author.username
	}

}

/**
 * Removes the clicked upon post from 'saved posts' 
 * @param post - the post that you want to unsave
 */
const unsave = async (post: number) => {
	// const index = store.idArrayOfSavedPosts.findIndex((id) => id === post)


	// store.idArrayOfSavedPosts.splice(index, 1)

	await getSaveOrUnsavePost(post)
}

/**
 * Adds the clicked upon post to 'saved posts' 
 * @param post - the post that you want to save
 */
const save = async (post: number) => {

	await getSaveOrUnsavePost(post)
}


const unFollowUser = async (username: string) => {
	const theNormalUserProfileUNSAVEURL = `http://localhost:8888/api/${username}/unfollow/`;

	await getUnfollowUser(theNormalUserProfileUNSAVEURL)

	const index = store.idArrayOfLoggedInUserFollowingUsers.findIndex((id) => id === username)
	store.idArrayOfLoggedInUserFollowingUsers.splice(index, 1)
	followers.value--

}


const followUser = async (username: string) => {
	const theNormalUserProfileSAVEURL = `http://localhost:8888/api/${username}/follow/`;

	await getFollowUser(theNormalUserProfileSAVEURL)

	store.idArrayOfLoggedInUserFollowingUsers.push(username)
	followers.value++
}

onDeactivated(() => {
	followers.value = 0
	store.idArrayOfLoggedInUserFollowingUsers = []
})



definePageMeta({
	layout: "default"
})

</script>

<style scoped></style>