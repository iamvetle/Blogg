<template>
    <div>
        <p>{{ post }}</p>
        <p>{{ post.content }}</p>
        <p>{{ post.author.username }}</p>
</div>
</template>


<script setup>
import { ref } from 'vue'

import axios from 'axios'

let post = ref({})


const postId = useRoute()
const url = `http://localhost:8888/api/post/${postId.params.id}`

onMounted( () => { axios.get(url)
  .then((Response) => { 
    console.log(Response); 
    post.value = Response.data 
  }).catch((error) => { 
    console.error(error)
  })})


</script>