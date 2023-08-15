<template>
    <div>
        <p>{{ $route.params.id }}</p>
        <p>{{ post.title }}</p>
        <p>{{ post.content }}</p>
        <p>{{ post.author.username }}</p>
    </div>
</template>

<script setup lang="ts">
//@ts-nocheck

const postId = useRoute()


const { data:post, error } = await useFetch(`http://localhost:8888/api/post/${postId.params.id}`) // fix error code later
console.log("PostFullView OK", post.value)
console.log("PostFullView Error", error)
</script>