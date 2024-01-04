<template>
	<div class="article grid-cols-12 grid gap-8 mb-16">
		<div
			data-article="left-col-article"
			class="col-start-1 col-end-9"
			v-if="post"
		>
			<span class="flex items-center w-full mb-2">
				<!-- Profile picture-->
				<span class="user-picture flex items-center">
					<BaseImage
						v-show="true"
						:src="account_picture"
						alt="Bruker profilbilde"
						class="w-6 h-auto me-2"
					/>
				</span>

				<!-- Author-->
				<span class="flex items-center justify-between w-full">
					<span class="flex items-center full_name">
						<NuxtLink
							:to="`/user/${post.author.username}`"
							class="cursor-pointer break-words"
							v-if="showUsername"
						>
							<span
								class="font-bold"
								v-text="author_full_name(post.author)"
							></span>
						</NuxtLink>
					</span>

					<!-- Date published -->
					<span
						class="cursor-default font-light"
						v-text="post.date_published"
					></span>
				</span>
			</span>

			<div class="mb-4 w-full">
				<!--Title-->
				<NuxtLink
					:to="`/post/${post.id}`"
					class="cursor-pointer break-words"
				>
					<h3 class="text-[28px] mb-2" v-text="post.title"></h3>
				</NuxtLink>

				<!--Content-->
				<div class="break-words mb-2"
					v-text="fromHTMLtoText(post.content_snippet)">
				</div>
			</div>

			<span class="flex items-center justify-between">
				<span class="flex items-center space-x-2">
					<!-- Les mer -->
					<span
						class="cursor-pointer text text-primary hover:text-primaryFixed"
						@click="redirect_to_post_page(post.id)"
					>
						Les mer
					</span>

					<!--Tags-->
					<span class="flex items-center">
						<span
							class="me-1"
							v-for="tag in post.tags"
							v-if="post.tags"
						>
							<BaseTag :key="post.id" :text="tag.name" />
						</span>
					</span>
				</span>

				<span class="flex items-center">
					<!--Amount of comments-->
					<span data-article="comments-count" class="me-2">
						<span
							v-if="post.num_of_comments >= 1"
							class="cursor-default space-x-1 flex items-center"
						>
							<span>{{ post.num_of_comments }} </span>
							<Icon name="has-comments" class="h-6" />
						</span>
						<span
							v-else
							class="cursor-default space-x-1 flex items-center"
						>
							<span>{{ post.num_of_comments }} </span>
							<Icon name="no-comments" class="h-6" />
						</span>
					</span>

					<!--Save article-->
					<span data-article="save-article" class="me-2">
						<PostBookmark
							v-if="
								post.id &&
								checkIfLoggedInUser(post.author.username) ==
									false &&
								authStore.isAuthenticated
							"
							:post="post.id"
							data-test="post_bookmark"
						/>
					</span>

					<!--Article options-->
					<span data-article="article-options" class="">
						<BaseIconMoreOptions
							widthProp="24"
							heightProp="24"
							:colorProp="color"
							@mouseover="color = 'fill-primary'"
							@mouseleave="color = 'fill-black'"
						/>
					</span>
				</span>
			</span>
		</div>

		<div
			data-article="right-col-article"
			class="col-span-4 flex items-center justify-center"
		>
			<!-- Article image -->
			<img
				:src="exampleImage"
				alt="Bilde til artikkel"
				class="w-full h-auto"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
import account_picture from "~/assets/account-pin-circle-line.svg";
import exampleImage from "~/assets/example-image.jpg";

withDefaults(
	defineProps<{
		post: SnippetPostSingleType;
		showUsername?: boolean;
	}>(),
	{
		showUsername: true,
	},
);

const color = ref("fill-black");

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
 * Redirects the web client to the profile page of the author
 * @param username
 *
 * @returns - Redirects to the users profile page
 */
const redirect_to_author_page = (username: string) => {
	return navigateTo(`/user/${username}`);
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

/**
 * ! Make this NOT a SLOT component. Turned out to not be helpfull,
 * ! because the component is always designed the same way. And it is not more easy to get an overview.
 */
</script>

<style scoped></style>
