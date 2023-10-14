<template>
	<div id="site-wrapper">
		<div class="w-9/12 mx-auto border-v pb-[60px]">
			<div class="w-full px-[80px] grid grid-cols-12 gap-[80px]">
				<div class="inline-block col-start-1 col-end-9 border-v border-blue-500">
					<!-- 8/12 main content-->

					<img id="header" :src="placeholder_header_image"
						class="h-[150px] w-full object-cover border-v border-slate-500">
					<!-- The IMAGE -->

					<div id="top" class="px-2 pt-[50px]">
						<div id="heading" class="prose">
							<h2 class="text-4xl leading-[52px] font-medium tracking-[-0.03em]">
								{{ first_name }} {{ last_name }}
							</h2>
						</div>

						<div class="pt-[30px]">
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
					<div id="main" class="pt-[50px]">
						<div class="article" v-for="post in store.theUser[0].posts" :key="post.id">

							<article-card>

								<template #author v-if="post.author">
									<span>
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
									<span class="cursor-pointer text text-primary hover:text-primaryFixed"
										@click="redirect_to_post_page(post)">
										Les mer
									</span>
								</template>

								<template #tags v-if="post.tags">
									<span>
										<BaseTag v-for="(tag, index) in post.tags" :key="index" :textProp="tag"
											class="me-1" />
									</span>
								</template>

								<template #save-article-icon>
									<BaseIconSaveArticle width-prop="24" height-prop="24" :color-prop="color"
										@mouseover="color = 'fill-primary'" @mouseleave="color = 'fill-black'"
										@click="doSavePost(post.id)" class=":" />
								</template>

								<template #more-options-icon>
									<BaseIconMoreOptions width-prop="24" height-prop="24" :color-prop="color"
										@mouseover="color = 'fill-primary'" @mouseleave="color = 'fill-black'" />
								</template>

								<template #article_image>
									<img :src="post_image" alt="Bilde til artikkel" class="w-full h-auto">
								</template>

							</article-card>


							<hr class="mb-16">
						</div>
					</div>
				</div>

				<div id="sidebar" class="px-5 col-span-4 border-v border-red-500">
					<TheSidebar v-if="store.theUser[0].posts != null" :side-bar-prop="userProp"
						:num_of_followers="followers" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// a user's page

import placeholder_header_image from '~/assets/placeholder-image.jpg'
// import UserPostCard from '~/components/modules/Blogg/UserPostCard.vue';
import TheSidebar from '~/components/modules/UserProfile/TheSidebar.vue';
import { useGeneralStore } from '~/store/generalStore';
const post_image = ref('https://picsum.photos/500/300')


const author_full_name = (post: SnippetPostSingleType) => {

console.log("author full name function being called")
console.log(post.author)
const author = post.author

const full = `${author.first_name} ${author.last_name}` ?? author.username
return full.trim() == "" ? author.username : full
}

/** Essentially 'dumps' the input into a div and returns the plain text */
const toPlainText = (raw: string) => {
	const div = document.createElement('div')
	div.innerHTML = raw
	return div.textContent || div.innerText
}

const store = useGeneralStore()

const userProp = ref(null);
const first_name = ref(null);
const last_name = ref(null);
const followers = ref(null)
const username = ref(null)
const color = ref("fill-black")

const redirect_to_post_page = async (post: SnippetPostSingleType) => {
	const post_article_page = post.id

	return await navigateTo(`/post/${post_article_page}`)
}

await (async () => {
	const route = useRoute();
	const theUserURL = `http://localhost:8888/api/${route.params.id}/`;

	await fetchUserInfoPosts(theUserURL);
	console.dir(toRaw(store.theUser[0]))

	followers.value = store.theUser[0].posts[0].num_of_followers;
	console.log(toRaw(followers.value))

	console.log(toRaw(store.theUser[0].posts))
	console.log(toRaw(store.theUser[0].posts[0].author.first_name))
	//

	//
	first_name.value = store.theUser[0].posts[0].author.first_name
	last_name.value = store.theUser[0].posts[0].author.last_name
	username.value = store.theUser[0].posts[0].author.username

	userProp.value = username.value;

})();


</script>

<style scoped></style>
