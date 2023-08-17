<template>
    <div id="site-wrapper" class="container mx-auto" >
      
	<div class="container" id="container">
        <h1 class="text-5xl pb-3">The most recent posts</h1>
        <div v-for="post in posts" class="p-2 w-6/12 inline-block">
          <PostPartialView
          :key="post.id"
          :postDetail="post"
          />
        </div>    
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

// // Post placement
// function postPlacement(postCount) {
// 	if postCount = 1
// }


// Fetch from API
onMounted( () => { axios.get("http://localhost:8888/api/feed/")
	.then((Response) => { 
		posts.value = Response.data
		console.dir("All posts retrieved:", Response.data) 
	}).catch((error) => { 
		console.error("Error, fetching all posts:", error)
	})})


</script>