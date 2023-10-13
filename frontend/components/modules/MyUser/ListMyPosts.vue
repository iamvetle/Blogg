<template>
  <div class="bg-onPrimary mb-6 px-5 py-5 border rounded-lg border-primary">
    <div class="flex justify-between">
      <span class="font-bold">{{ postProp.title }}</span>
      <span class="flex">
        <span class="mr-2">posted: </span>
        <span class="">{{ postProp.date_published }}</span>
      </span>
    </div>
    <p class="mt-2">
      {{ postProp.content_snippet }}
    </p>
  </div>
</template>

<script setup lang="ts">
// For the posts in the 'min-side'

const { postProp } = defineProps(["postProp"]);
console.log(postProp)
</script>

<style scoped></style>
