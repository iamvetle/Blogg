<template>

    <div id="site-wrapper">
      <div class="container" id="container">
        <h1 class="text-5xl">The most recent posts</h1>
        <div v-for="post in posts">
          <PostPartialView
          :key="post.id"
          :postDetail="post"
          />
        </div>    
    </div>
  </div>
</template>
  

  <script setup lang="ts">

  interface PostType {
    id: number;
    title: string;
    content: string;
    author: object;    
  }
  
  const baseURL = "http://localhost:8888/api/feed/"

  import { ref, onMounted } from 'vue';
  import axios from 'axios'

  let posts = ref<PostType[]>([])

  axios.get("http://localhost:8888/api/feed/")
  .then((Response) => { 
    posts.value = Response.data
    console.dir("All posts retrieved:", Response.data) 
  }).catch((error) => { 
    console.error("Error, fetching all posts:", error)
  })


  </script>