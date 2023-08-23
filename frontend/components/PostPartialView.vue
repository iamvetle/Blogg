<template>
    <div id="post" class="prose"> <!-- Post -->
        <div class="img">
            <img src="../assets/noimage.jpg" class="border rounded-lg border-gray-400" alt="bilde">
        </div>
        <div id="content">
            <h3 class="text-3xl">{{ postDetail.title }}</h3>
            <p class="text-base">{{ postDetail.content }}</p>
            <small class="font-bold">- {{ postDetail.author.username }}</small> 
            <nuxt-link :to="`/post/${postDetail.id}`"><p class="text-[#823038] pt-1 hover:text-[#DEBA6F]">Fortsett å lese</p></nuxt-link>
        </div>
    </div>
</template>


<script setup lang="ts">

// Props
const { postDetail } = defineProps(["postDetail"])

</script>