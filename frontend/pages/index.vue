<template>
    <div id="site-wrapper" class="container mx-auto" >
        <h1 class="text-5xl pb-3">The most recent posts</h1>
        <div>
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
	if ( (index + 1) % 3 === 0) {
		return "w-full mx-auto border border-red-500 p-2 m-2"
	} else {
		return "w-5/12 inline-block border border-blue-500 p-2 m-2"
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