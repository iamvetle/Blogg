<template>
  <div id="site-wrapper">
    <div class="container" id="container">
      <h1 class="text-5xl">The most recent posts</h1>
      <ul>
        <li v-for="post in posts" :key="post.id" class="p-10">
          {{ post.title }} by {{ post.author.username }}
          <div class="w-[200px] h-[200px] blur-[1px] border">
            {{ post.content }}
          </div>
        </li>
      </ul>
    </div>    
  </div>
</template>

<script setup>

import axios from 'axios'
import { onMounted, ref } from 'vue';

const feedPostsURL = "http://localhost:8888/api/feed/"

let posts = ref([])

function fetchPosts() {
  axios.get(feedPostsURL)
  .then((response) => {
    console.log("Successfully 'fetchPosts'", response.status)
    console.log("All:", response.data)
    posts = response.data
  })
  .catch((error) => {
    console.error(error)
  } )
}

onMounted(fetchPosts)

</script>