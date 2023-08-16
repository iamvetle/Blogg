<template>
    <div>
        <nuxt-link :to="`/post/${postDetail.id}`"> <p class="text-xl hover:text-red-500">{{ postDetail.title }}</p></nuxt-link> <!-- Link -->
        <p>{{ postDetail.content }}</p>
        <p class=" font-bold"><i>-{{ postDetail.author.username }}</i></p>
    </div>
</template>


<script setup lang="ts">

// Props
const { postDetail } = defineProps(["postDetail"])

</script>