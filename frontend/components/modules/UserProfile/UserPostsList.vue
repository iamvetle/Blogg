<template>
	<div v-if="posts?.results">
		<div v-for="post in posts?.results">
			<div class="article" :key="post.id">
				<FeedPostPreviewCard :post="post" :show-username="false" />
				<hr class="mb-16" />
			</div>
		</div>
	</div>
	<div v-else>
		<p>This user hasn't made any posts</p>
	</div>
</template>

<script setup lang="ts">

const posts = ref<SnippetPostMultipleType | null>(null);

/**
 * The prop that is received is a list of all of the users posts. This component lists all of those.
 */

const props = defineProps<{
	username: string;
}>();

/**
 * The component is used inside of the user id page and lists all posts made
 */
const dataSetup = async () => {
	const theNormalUserPostsURL = urls.api.posts.user(props.username);

	/**
	 * Fetches the posts the user has made through the API address of the user.
	 * And puts them in a reactive variable.
	 *
	 * @param theNormalUserPostsURL The URL address that the function is going to fetch from.
	 */
	const responseData_posts = await getNormalUserPosts(theNormalUserPostsURL);

	if (responseData_posts) {
		posts.value = responseData_posts;
	}
};

onBeforeMount(() => dataSetup());
</script>

<style scoped></style>
