<template>
  <div class="mb-6">
    <div class="flex justify-between">
      <span class="text-gray-600 font-bold">{{ postProp.title }}</span>
      <span class="flex">
        <span class="text-gray-600 mr-2">posted: </span>
        <span class="text-gray-600">{{ postProp.date_published }}</span>
      </span>
    </div>
    <p class="mt-2">
      {{ postProp.content }}
    </p>
  </div>
</template>

<script setup lang="ts">
// For the posts in the 'min-side'

const { postProp } = defineProps(["postProp"]);
</script>

<style scoped></style>
