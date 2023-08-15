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

  import { onMounted, ref } from 'vue';

  const { data:posts } = await useFetch(baseURL) // fix error code later
  const props = defineProps(["postDetail"])  
  </script>