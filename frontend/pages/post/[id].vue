<template>
    <div v-if="post" class="container w-8/12 pt-8">
		<button @click="$router.go(-1)" class="border bg-light-blue-400">Back</button>
        
		    <p class="text-2xl py-2">{{ post.title }}</p>
        <p>{{ post.content }}</p>
        <p class="pt-5 font-bold">{{ post.author.username }}</p>
	</div>
</template>


<script setup lang="ts">

// Typescript
interface PostType {
  id:number;
  title:string;
  content:string;
  author: {
    username:string;
  };
}

// Imports
import { ref } from 'vue'
import axios from 'axios'

// Variables
let post = ref<PostType | null>(null)
const postId = useRoute()
const url = `http://localhost:8888/api/post/${postId.params.id}`

// Life cycle
onMounted( () => { axios.get(url)
  .then((Response) => { 
    console.log(Response); 
    post.value = Response.data 
  }).catch((error) => { 
    console.error(error)
  })})


</script>