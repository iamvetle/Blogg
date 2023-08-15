<template>

    <div id="site-wrapper">
      <div class="container" id="container">
        <h1 class="text-5xl">The most recent posts</h1>
          <PostPartialView
          v-for="post in posts"
          :key="post.id"
          :postDetail="post"
          
          />
      </div>    
    </div>
  </template>
  
  
  <script setup lang="ts">
  
  const baseURL = "http://localhost:8888/api/feed/"

  import { ref, onMounted } from 'vue';
  import axios from 'axios'

  let posts = ref([])

  onMounted(async () => {
  try {
    const response = await axios.get(baseURL)
    posts.value = response.data
    console.log("PostListAll OK", posts.value)
  } catch (error) {
    console.error(error)
  }
})

  console.log("PostListAll OK", posts)
  </script>