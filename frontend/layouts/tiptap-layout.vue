<template>
  <div id="site-wrapper" class="bg-background">
    <!-- Background color -->
    <ClientOnly>
      <slot />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
console.log("tiptap-layout selected")

</script>

<style scoped></style>
