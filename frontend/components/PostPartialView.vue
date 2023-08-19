<template>
            <div id="post"> <!-- Post -->
                <div class="img">
                    <img src="../assets/noimage.jpg" class="border border-2 rounded-lg border-gray-400" alt="bilde">
                </div>
                <div id="content">
                    <nuxt-link :to="`/post/${postDetail.id}`"><h3 class="text-3xl pt-4 hover:text-[#DEBA6F]">{{ postDetail.title }}</h3></nuxt-link>
                    <p class="text-base pt-2">{{ postDetail.content }}</p>
                    <small class="font-bold">- {{ postDetail.author.username }}</small> 
                    <p class="text-[#823038] pt-1 hover:text-[#DEBA6F]">Fortsett å lese</p>
                </div>
            </div>
</template>


<script setup lang="ts">

// Props
const { postDetail } = defineProps(["postDetail"])

</script>