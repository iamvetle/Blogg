<template>
    <div>
        <p>{{ post.title }}</p>
        <p>{{ post.content }}</p>
        <p> {{ post.author.username }}</p>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

import axios from 'axios'

let post = ref("temp")


const postId = useRoute()

axios(`http://localhost:8888/api/post/${postId.params.id}`)
  .then((Response) => { 
    console.log(Response); 
    post.value = Response.data 
  }).catch((error) => { 
    console.error(error)
  })
</script>