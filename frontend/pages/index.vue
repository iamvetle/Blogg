<template>
    	<div>
			<div id="main" class="grid grid-cols-12 gap-8 py-12">
          	<h2 class="text-4xl text-center pt-6 pb-10 col-span-12">Siste blogginnlegg</h2>
			<PostPartialView
			v-for="(post, index) in posts"
			:key="post.id"
			:postDetail="post"
			:class="postPlacement(index)"
			/>
        	</div>
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

function postPlacement(index: number) {
	if ( (index + 1) % 2 === 0) {
		return "col-span-3"
	} else {
		return "col-start-4 col-span-3"
	}
};

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