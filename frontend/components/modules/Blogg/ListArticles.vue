<template>
	<div id="site-wrapper" class="bg-background text-onBackground">
		<div v-if="(store.posts) && (store.posts.results)" id="content">

			<div class="article" v-for="post in store.posts.results" :key="post.id" :post-prop="post">

				<article-card>

					<template #author v-if="post.author">
						<span @click="redirect_to_author_page(post)">
							<p class="font-bold" v-text="author_full_name(post)">
							</p>
						</span>
					</template>

					<template #date_published v-if="post.date_published">
						<p class="font-light" v-text="post.date_published"></p>
					</template>

					<template #title>
						<span @click="redirect_to_post_page(post)">
							<h3 class="text-[28px] mb-2" v-text="post.title">
							</h3>
						</span>
					</template>

					<template #content v-if="post.content_snippet">
						<p class="mb-2" v-text="toPlainText(post.content_snippet)">
						</p>
					</template>


					<template #lesmer>
						<span class="text text-primary hover:text-primaryFixed" @click="redirect_to_post_page(post)">
							Les mer
						</span>
					</template>

					<template #tags v-if="post.tags">
						<span>
							<BaseTag v-for="tag, index in post.tags" :key="index" :textProp="tag" class="me-1" />
						</span>
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
import { ArticleSnippetSingleType } from '~/typescript/interfaces';

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
