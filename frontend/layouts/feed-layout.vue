<template>
  <div id="site-wrapper" class="bg-white">
    <!-- Background color -->
    <ElementTheHeader/>
    <ClientOnly>
      <ElementNavbar/>
    </ClientOnly>
    <slot />
    <ElementFooter/>
  </div>
</template>

<script setup lang="ts">
// Used by index.vue

console.log("'feed-layout' layout is selected");
</script>

<style scoped></style>
