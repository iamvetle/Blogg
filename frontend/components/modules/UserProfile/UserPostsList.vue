<template>
	<div v-for="post in posts?.results">
		<div class="article" :key="post.id">
			<feed-post-preview-card>
				<template #profile_picture>
					<img
						v-show="true"
						:src="account_picture"
						alt="Bruker profilbilde"
						class="w-6 h-auto me-2"
					/>
				</template>

				<template #author v-if="post.author">
					<span class="cursor-pointer break-words">
						<p
							class="font-bold"
							v-text="author_full_name(post.author)"
						></p>
					</span>
				</template>

				<template #date_published v-if="post.date_published">
					<span>
						<p class="font-light" v-text="post.date_published"></p>
					</span>
				</template>

				<template #title v-if="post.title">
					<span
						@click="redirect_to_post_page(post.id)"
						class="cursor-pointer break-words"
					>
						<h3 class="text-[28px] mb-2" v-text="post.title"></h3>
					</span>
				</template>

				<template #content v-if="post.content_snippet">
					<div class="break-words">
						<p
							class="mb-2"
							v-text="toPlainText(post.content_snippet)"
						></p>
					</div>
				</template>

				<template #lesmer v-if="post.id">
					<span
						class="cursor-pointer text text-primary hover:text-primaryFixed"
						@click="redirect_to_post_page(post.id)"
					>
						Les mer
					</span>
				</template>

				<!-- Needs to be authenticated to be able to save posts-->
				<template #tags v-if="post.tags && authStore.isAuthenticated">
					<span class="me-1" v-for="tag in post.tags">
						<BaseTag :key="post.id" :text="tag.name" />
					</span>
				</template>

				<template
					#amount-of-comments
					v-if="post.num_of_comments !== null"
				>
					<span>{{ post.num_of_comments }} comments</span>
				</template>

				<template
					#save-article-icon
					v-if="
						post.id &&
						!checkIfLoggedInUser(post.author.username) &&
						authStore.isAuthenticated
					"
				>
					<PostBookmark :post="post.id" />
				</template>

				<template #more-options-icon v-if="post.id">
					<BaseIconMoreOptions
						widthProp="24"
						heightProp="24"
						:colorProp="color"
						@mouseover="color = 'fill-primary'"
						@mouseleave="color = 'fill-black'"
					/>
				</template>

				<template #article_image v-if="post.id">
					<img
						:src="post_image"
						alt="Bilde til artikkel"
						class="w-full h-auto"
					/>
				</template>
			</feed-post-preview-card>

			<hr class="mb-16" />
		</div>
	</div>
</template>

<script setup lang="ts">
import account_picture from "~/assets/account-pin-circle-line.svg";

const authStore = useAuthStore();
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

/** Stores the color that the bookmark icon is rendered with. */
const color = ref("fill-black");

/**
 * @todo remove this and add the proper pictures made with the post
 * Stores the image that is temporarly being used with each post. The picture from the URL changes dynamically upon each request.
 */
const post_image = ref("https://picsum.photos/500/300");

/**
 * Navigates, or redirects, the web client to the
 * specific page for the post
 *
 * @param post - the id of the post
 */
const redirect_to_post_page = async (post: any) => {
	const post_article_page = post;

	return await navigateTo(`/post/${post_article_page}`);
};

/**
 * Takes the HTML input and returns the pure text version of it.
 *
 * @param raw The raw HTML to be converted
 * @returns The plain text version
 */
const toPlainText = (raw: string) => {
	const div = document.createElement("div");
	div.innerHTML = raw;
	return div.textContent || div.innerText;
};

/**
 *
 * @param author - the 'author' part of the relevant 'post'
 */
const author_full_name = (author: AuthorType) => {
	// console.log(author) // print to self

	const full_name = `${author.first_name} ${author.last_name}`;
	return full_name.trim() == "" ? author.username : full_name;
};

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
