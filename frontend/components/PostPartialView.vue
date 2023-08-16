<template>
    <div>
        <nuxt-link :to="`/post/${postDetail.id}`"> <p>{{ postDetail.title }}</p></nuxt-link> <!-- Link -->
        <p>{{ postDetail.content }}</p>
        <p>{{ postDetail.author.username }}</p>
    </div>
</template>


<script setup lang="ts">

// Props
const { postDetail } = defineProps(["postDetail"])

</script>