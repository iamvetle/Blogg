<template>
	<div class=" max-w-3xl py-[100px] mx-auto">
		<div v-if="post" class="w-full px-[60px] py-[30px] prose">
			<h1 class="">
				{{ post.title }}
			</h1>
			<div>
				<span class="mb-4 flex items-center justify-between">
					<span class="flex items-center">
						<img :src="placeholder_profile_picture" alt="" class="mr-2 h-8">
						<NuxtLink :to="`/user/${post.author.username}`" class="not-prose">
							<p class="font-bold inline">
								- {{ post.author.first_name }} {{ post.author.last_name }}
							</p>
						</NuxtLink>
						<!-- <BaseButtonFollow v-if="!checkIfLoggedInUser(post.author.username)" :username="post.author.username" /> -->

					</span>
					<span class="text-xs float-right">Published {{ post.date_published }}</span>
				</span>
			</div>

			<span v-if="!checkIfLoggedInUser(post.author.username)">
				<PostBookmark :post="post.id" />
			</span>

			<hr>

			<div>

				<div v-if="post.num_of_comments !== null" class="mb-2 flex space-x-1" id="tags">
					<span>{{ post.num_of_comments }} comments</span>
				</div>
				<hr>

				<div id="all_tags" v-if="post.tags">
					<TagsList :tags="post.tags" />
				</div>

				<!-- Obviously don't want both long term
				<div v-if="post.categories" class="mb-2 flex space-x-1" id="categories">
					<span class="flex" v-for="(category, index) in post.categories">
						<BaseTag :text="category" :key="index" />
					</span>
				</div> -->

			</div>

			<div class="mb-4" v-html="post.content"></div>

			<button class="border-2 bg-light-blue-400 rounded-lg py-1 px-2" @click="navigateTo('/')">
				Back
			</button>

			<hr>

			<div data-test="comments">
				<h2>Comments written:</h2>
				<div>
					<SinglePostCommentsList :comments="all_comments" />
				</div>
				<CommentAdd/>
			</div>
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
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

const post = ref<PostSingleType | null>(null);
const all_comments = ref<CommentType[] | null>(null);
const route = useRoute()
const loggedInUserStore = useLoggedInUserStore()


onMounted(async () => {
	const postURL = `http://localhost:8888/api/post/${route.params.id}/`;


	/** The actual fetch, that fetches one post */
	post.value = await getSinglePost(postURL);

	const commentsURL = `http://localhost:8888/api/post/${route.params.id}/comments/`
	all_comments.value = await getSinglePostComments(commentsURL)
});

onMounted(async () => {

	/**
	 * I need to fetch this to be able to check if I am following the user
	 * 
	 * Checks if the pinia store already has information about whom the logged-in user is following. 
	 */
	if (!Array.isArray(loggedInUserStore.idArrayOfLoggedInUserFollowingUsers) || !loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.length) {
		await getLoggedInUserProfile("http://localhost:8888/api/min-side/");
	}

})

definePageMeta({
	layout: 'default'
})

</script>


<style scoped></style>