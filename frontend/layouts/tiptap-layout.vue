<template>
  <div id="site-wrapper" class="bg-background">
    <!-- Background color -->
    <ClientOnly>
      <slot />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Used by index.vue

console.log("'tiptap-layout' layout is selected");
</script>

<style scoped></style>
