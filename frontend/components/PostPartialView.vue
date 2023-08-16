<template>
    <div>
        <nuxt-link :to="`/post/${postDetail.id}`"><p>{{ postDetail.title }}</p></nuxt-link>
        <p>{{ postDetail.content }}</p>
        <p>{{ postDetail.author.username }}</p>
    </div>
</template>


<script setup lang="ts">

const { postDetail }:any = defineProps(["postDetail"])
console.log(postDetail)

</script>