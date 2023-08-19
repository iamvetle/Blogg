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

// Typescript
interface PostType {
	id: number;
	title: string;
	content: string;
	author: object;    
}
// Imports
import { ref, onMounted } from 'vue';
import axios from 'axios'

// Variables
const baseURL = "http://localhost:8888/api/feed/"
const posts = ref<PostType[]>([])

// Post placement
function postPlacement(index: number) {
	if ( (index + 1) % 2 === 0) {
		return "col-span-3"
	} else {
		return "col-start-4 col-span-3"
	}
};


// Fetch from API
onMounted( () => { axios.get("http://localhost:8888/api/feed/")
	.then((Response) => { 
		posts.value = Response.data
		console.dir("All posts retrieved:", Response.data) 
	}).catch((error) => { 
		console.error("Error, fetching all posts:", error)
	})})


</script>