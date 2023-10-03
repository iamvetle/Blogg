<template>
  <div
    id="site-wrapper"
    class="bg-background flex flex-col min-h-screen"
  >
    <!-- Background color -->
    <div class="flex-1 flex flex-col">
      <ClientOnly>
        <TheNavbarr />
      </ClientOnly>
      <div class="flex-1">
        <slot />
      </div>
    </div>
    <div class="mt-auto">
      <FeedPagination/>
      <TheFooter />
    </div>  
  </div>
</template>

<script setup lang="ts">

// Used by index.vue
console.log("'feed-layout' layout is selected");
</script>

<style scoped></style>
