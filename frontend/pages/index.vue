<template>
    	<div>
			<section class="bg-white dark:bg-gray-900">
				<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
						<h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Siste blogginnlegg</h2>
						<p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Her er de siste blogginnleggene.</p>
					</div>

					<div id="main" class="grid gap-8 lg:grid-cols-2">
						<PostPartialView
						v-for="(post, index) in posts"
						:key="post.id"
						:postDetail="post"
						/>
					</div>
				</div>
			</section>
		</div>    	
</template>

<script setup lang="ts">

definePageMeta({
	layout:"index-layout",
})

interface PostType {
	id: number;
	title: string;
	content: string;
	author: object;    
}

import axios from 'axios'

const baseURL = "http://localhost:8888/api/feed/"
const posts = ref<PostType[]>([])

// Fetch from API

const fetchPosts = async () => {
	try {
		const response = await axios.get(baseURL)
		posts.value = response.data
		console.dir("All posts retrieved:", response.data) 
	} catch {
		console.error("Error, fetching all posts:")

	}

} 

onMounted(fetchPosts)

</script>

<style scoped lang="scss">


</style>