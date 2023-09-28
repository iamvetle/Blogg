<template>
	<div id="site-wrapper" class="bg-background text-onBackground">
		<div id="main" class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<div v-if="(store.posts) && (store.posts.results)" id="content" class="col-span-6 mx-auto">

				<div class="article" v-for="post in store.posts.results" :key="post.id" :post-prop="post">

					<article-cardd>

						<template #author>
							<span @click="redirect_to_author_page(post)">
								<p class="font-bold" v-text="author_full_name(post)">
								</p	>
							</span>
						</template>

						<template #date_published>
							<p class=" font-light" v-text="post.date_published"></p>
						</template>

						<template #title>
							<span @click="redirect_to_post_page(post)">
								<h3 class=" text-[28px] mb-2" v-text="post.title">
								</h3>
							</span>
						</template>

						<template #content>
							<p class="mb-2 prose" v-text="post.content_snippet">
							</p>
						</template>


						<template #lesmer>
							<span class="text-sm flex items-center text-primary hover:text-primaryFixed"
								@click="redirect_to_post_page(post)">
								Les mer
							</span>
						</template>

						<template #tags>
							<div v-if="post.tags">
								<BaseTag v-for="tag, index in post.tags" :key="index" :text-prop="tag" class="me-1" />
							</div>
						</template>

						<template #article_image>
							<img :src="post_image" alt="Bilde til artikkel" class="w-full h-auto">
						</template>



					</article-cardd>


					<hr class="mb-16">
				</div>
			</div>

			<div id="aside" class="col-span-4 h-auto w-full mb-14 mx-auto">
				<div v-if="userdata" id="my-profile-card" class="w-full">
					<MyProfileCard :user-prop="userdata" />
				</div>

				<hr class="mb-8">

				<div id="saved-posts" class="mx-auto w-full mb-8">
					<h3 class=" text-[28px] mb-9">
						Lagrede innlegg
					</h3>

					<div class="saved-article">
						<ArticleSavedCard />
					</div>
					<p class="-mt-2 text-xs text-primary hover:text-primaryFixed">
						Se alle
					</p>
				</div>

				<hr class="mb-8">

				<div id="following-card" class="mx-auto w-full">
					<h3 class="text-[28px] mb-9">
						Følger
					</h3>
					<div id="following">
						<Following />
					</div>
					<span class="text-xs text-primary hover:text-primaryFixed">Se alle</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';
import { ArticleSnippetSingleType } from '~/typescript/interfaces';
const post_image = ref('https://picsum.photos/500/300')

const store = useGeneralStore()
const userdata = ref<null | PersonalUserType>(null)

onBeforeMount(async () => {
	await fetchPostSnippets()
	console.log(store.posts)
})

onMounted(async () => {
	const baseMyUserURL = "http://localhost:8888/api/min-side/"
	userdata.value = await fetchPersonalUser(baseMyUserURL)
	console.log(userdata.value.data) // print to self
})

const redirect_to_author_page = async (post:ArticleSnippetSingleType) => {
	const author_profile_page = post.author.username

	return await navigateTo(`/user/${author_profile_page}`)
}

const redirect_to_post_page = async (post:ArticleSnippetSingleType) => {
	const post_article_page = post.id

	return await navigateTo(`/post/${post_article_page}`)
}

const author_full_name = (post:ArticleSnippetSingleType) => {
	const author = post.author

	const full = `${author.first_name} ${author.last_name}`;
	return full
}


</script>

<style scoped></style>
