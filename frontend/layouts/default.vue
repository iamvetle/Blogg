<template>
  <div id="site-wrapper" class="bg-white">
    <div>
      <ClientOnly>
        <Navbar />
      </ClientOnly>
      <slot />
      <ElementFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
console.log("'default' layout is selected");
</script>

<style scoped></style>
