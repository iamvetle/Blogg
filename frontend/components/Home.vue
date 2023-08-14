<template>

    <div id="site-wrapper" v-if="!showPost">
      <div class="container" id="container">
        <h1 class="text-5xl">The most recent posts</h1>
        <ul>
          <li v-for="post in posts" :key="post.id" class="p-10">
            <div @click="seePost(post.id)">{{ post.title }}</div> by {{ post.author.username }}
            <div class="w-[200px] h-[200px] border">
              {{ post.content }}
            </div>
          </li>
        </ul>
      </div>    
    </div>
    <Post />
  </template>
  
  
  <script setup lang="ts">
  
  import axios from 'axios'
  import { onMounted, ref } from 'vue';
  
  function seePost(id) {
  
  }
  
  type Post = {
    id:number;
    title:string;
    content:string;
    author:{username:string};
  };
  
  let posts = ref<Post[]>([])
  let showPost = ref(false)
  
  const feedPostsURL = "http://localhost:8888/api/feed/"
  
  function fetchPosts() {
    axios.get(feedPostsURL)
    .then((response) => {
      console.log("Successfully 'fetchPosts'", response.status)
      console.log("All:", response.data)
      posts.value = response.data
    })
    .catch((error) => {
      console.error(error)
    } )
  }
  
  function postClick() {
  
  }
  
  onMounted(fetchPosts)
  
  </script>