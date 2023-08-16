<template>

    <div id="site-wrapper">
      <div class="container" id="container">
        <h1 class="text-5xl">The most recent posts</h1>
        <div v-for="post in posts">
          {{ post.title }}
          <PostPartialView 
          :key="post.id"
          :postDetail="post"
          />
        </div>    
    </div>
  </div>
</template>
  
  
  <script setup lang="ts">
  
  const baseURL = "http://localhost:8888/api/feed/"

  import { ref, onMounted } from 'vue';
  import axios from 'axios'

  let posts = ref([])

  //@ts-ignore
  axios("http://localhost:8888/api/feed/")
  .then((Response) => { 
    console.log(Response); 
    posts.value = Response.data 
  }).catch((error) => { 
    console.error(error)
  })


  </script>