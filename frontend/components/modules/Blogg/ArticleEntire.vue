<template>
  <div class="vt-artice grid grid-cols-12 gap-4 borderv border-green-500">
    <div class="px-2 col-span-9 border-v2 border-red-300">
      <span class="text-xs flex py-2">
        <p class="me-1 prose-xs">Published by</p>
        <p class="prose-xs font-bold me-2">{{ postProp.author.username }}</p>
        <p class="font-extralight prose-xs">
          - {{ postProp.date_published }}
        </p>
      </span>
      <h3 class="font-bold">
        {{ postProp.title }}
      </h3>
      <div class="prose" v-html="postProp.content_snippet" />
      <nuxt-link :to="readpost">
        <p class="pt-2 text-xs font-light hover:font-normal">
          Read more
        </p>
      </nuxt-link>
    </div>

    <div id="article-img" class="col-span-3 border-v2 border-red-300">
      <img :src="placeholder_image" class="h-[150px] bg-slate-100">
    </div>
  </div>
</template>

<script setup lang="ts">
import placeholder_image from '~/assets/placeholder-image.jpg'

const { postProp } = defineProps(["postProp"]);
console.log(postProp)

const readpost = `/post/${postProp.id}`;
</script>

<style scoped></style>
