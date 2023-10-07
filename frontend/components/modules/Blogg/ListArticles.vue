<template>
	<div id="site-wrapper" class="bg-background text-onBackground">
		<div v-if="(store.posts) && (store.posts.results)" id="content">

			<div class="article" v-for="post in store.posts.results" :key="post.id">

				<article-card>

					<template #author v-if="post.author">
						<span @click="redirect_to_author_page(post)" class="cursor-pointer">
							<p class="font-bold" v-text="author_full_name(post)">
							</p>
						</span>
					</template>

					<template #date_published v-if="post.date_published">
						<p class="font-light" v-text="post.date_published"></p>
					</template>

					<template #title>
						<span @click="redirect_to_post_page(post)" class="cursor-pointer">
							<h3 class="text-[28px] mb-2" v-text="post.title">
							</h3>
						</span>
					</template>

					<template #content v-if="post.content_snippet">
						<p class="mb-2" v-text="toPlainText(post.content_snippet)">
						</p>
					</template>


					<template #lesmer>
						<span class="cursor-pointer text text-primary hover:text-primaryFixed" @click="redirect_to_post_page(post)">
							Les mer
						</span>
					</template>

					<template #tags v-if="post.tags">
						<span>
							<BaseTag v-for="tag, index in post.tags" :key="index" :textProp="tag" class="me-1" />
						</span>
					</template>
<!-- 
					<template #save-article-icon>
						<svg width="24" height="24" class="fill-black" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24">
							<path
								d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z">
							</path>
						</svg>
					</template> -->

					<template #save-article-icon>
						<BaseIconSaveArticle
						widthProp="24"
						heightProp="24"	
						/>						
					</template>

					<template #article_image>
						<img :src="post_image" alt="Bilde til artikkel" class="w-full h-auto">
					</template>

				</article-card>

				<hr class="mb-16">
			</div>

	</div>
</div></template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const post_image = ref('https://picsum.photos/500/300')

const store = useGeneralStore()

/** Essentially 'dumps' the input into a div and returns the plain text */
const toPlainText = (raw: string) => {
	const div = document.createElement('div')
	div.innerHTML = raw
	return div.textContent || div.innerText
}

onBeforeMount(async () => {
	await fetchPostSnippets()
	console.log(store.posts)
})

const redirect_to_author_page = async (post: ArticleSnippetSingleType) => {
	const author_profile_page = post.author.username

	return await navigateTo(`/user/${author_profile_page}`)
}

const redirect_to_post_page = async (post: ArticleSnippetSingleType) => {
	const post_article_page = post.id

	return await navigateTo(`/post/${post_article_page}`)
}

const author_full_name = (post: ArticleSnippetSingleType) => {

	console.log("author full name function being called")
	console.log(post.author)
	const author = post.author

	const full = `${author.first_name} ${author.last_name}` ?? author.username
	return full.trim() == "" ? author.username : full
}

</script>

<style scoped></style>
