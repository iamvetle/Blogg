<template>
	<div
		v-if="postStore.posts"
		id="site-wrapper"
		class="bg-background text-onBackground"
	>
		<div v-if="postStore.posts.results" id="content">
			<div class="article" v-for="post in postStore.posts.results">
				<feed-post-preview-card :key="post.id">
					<template #profile_picture>
						<img
							v-show="true"
							:src="account_picture"
							alt="Bruker profilbilde"
							class="w-6 h-auto me-2"
						/>
					</template>

					<template #author v-if="post.author">
						<span
							@click="
								redirect_to_author_page(post.author.username)
							"
							class="cursor-pointer break-words"
						>
							<p
								class="font-bold"
								v-text="author_full_name(post.author)"
							></p>
						</span>
					</template>

					<template #date_published v-if="post.date_published">
						<span class="cursor-default">
							<p
								class="font-light"
								v-text="post.date_published"
							></p>
						</span>
					</template>

					<template #title v-if="post.title">
						<span
							@click="redirect_to_post_page(post.id)"
							class="cursor-pointer break-words"
						>
							<h3
								class="text-[28px] mb-2"
								v-text="post.title"
							></h3>
						</span>
					</template>

					<template #content v-if="post.content_snippet">
						<div class="break-words">
							<p
								class="mb-2"
							>{{ fromHTMLtoText(post.content_snippet) }}</p>
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
					<template #tags v-if="post.tags">
						<span class="me-1" v-for="tag in post.tags">
							<BaseTag :key="post.id" :text="tag.name" />
						</span>
					</template>

					<template
						#amount-of-comments
						v-if="post.num_of_comments !== null"
					>
						<span v-if="post.num_of_comments >= 1" class="cursor-default space-x-1 flex items-center">
							<span>{{ post.num_of_comments }} </span>
							<Icon name="has-comments" class="h-6" />
						</span>
						<span v-else class="cursor-default space-x-1 flex items-center">
							<span>{{ post.num_of_comments }} </span>
							<Icon name="no-comments" class="h-6" />
						</span>

					</template>

					<template
						#save-article-icon
						v-if="
							post.id &&
							checkIfLoggedInUser(post.author.username) ==
								false &&
							authStore.isAuthenticated
						"
					>
						<PostBookmark
							:post="post.id"
							data-test="post_bookmark"
						/>
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
	</div>
</template>

<script setup lang="ts">
import account_picture from "~/assets/account-pin-circle-line.svg";
import fromHTMLtoText from "~/utils/fromHTMLtoText";

const post_image = ref("https://picsum.photos/500/300");

const postStore = usePostStore();
const authStore = useAuthStore();

const color = ref("fill-black");



/**
 * Redirects the web client to the profile page of the author
 * @param username
 *
 * @returns - Redirects to the users profile page
 */
const redirect_to_author_page = (username: string) => {
	return navigateTo(`/user/${username}`);
};

/**
 * Redirects the web client to the page of the post
 * @param post
 *
 * @returns - Navigates the the specific post
 */
const redirect_to_post_page = (postId: number) => {
	return navigateTo(`/post/${postId}`);
};

/**
 * @param author - the 'author' part of the relevant 'post'
 *
 * @returns - The full name
 */
const author_full_name = (author: AuthorType) => {
	const full_name = `${author.first_name} ${author.last_name}`;
	return full_name.trim() == "" ? author.username : full_name;
};
</script>

<style scoped></style>
