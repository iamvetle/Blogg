<template>
    <div class="vt-artice grid grid-cols-12 gap-4 border border-green-500">

        <div class="px-2 col-span-9 border-2 border-red-300">
            <span class="text-xs flex py-2"><p class="me-1 prose-xs">Published by</p><p class="prose-xs font-bold me-2">{{ postProp.author.username }}</p><p class="font-extralight prose-xs">- 1 day ago</p></span>
            <h3 class="font-bold">{{ postProp.title }}</h3>
            <p>{{ postProp.content_snippet }}</p>
            <p class="pt-2 text-xs font-light hover:font-normal">Read more</p>
        </div>

        <div id="article-img" class="col-span-3 border-2 border-red-300">
            <img src="~/assets/noimage.jpg" class="h-[150px] bg-slate-100">
        </div>
    </div>
</template>

<script setup lang="ts">

const { author, postProp } = defineProps(["author", "postProp"])

</script>

<style scoped>

</style>