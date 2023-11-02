<template>
    <div class="bg-onPrimary mb-6 px-5 py-5 border rounded-lg border-primary">
        <div class="flex justify-between">
            <span class="font-bold">{{ post.title }}</span>
            <span class="flex">
                <span class="mr-2">posted: </span>
                <span class="">{{ post.date_published }}</span>
            </span>
        </div>
        <div class="break-words">
            <p class="mt-2">
                {{ post.content_snippet }}
            </p>
        </div>
    </div>
</template>
  
<script setup lang="ts">
// For the posts in the 'minkonto'

const { post } = defineProps(["post"]);
console.log(post)
</script>
  
<style scoped></style>
  