<template>
    <div id="site-wrapper" class="bg-white flex flex-col min-h-screen">
      <!-- Background color -->
      <div class="flex-1 flex flex-col">
        <ClientOnly>
          <ElementNavbar />
        </ClientOnly>
        <div class="flex-1">
          <slot />
        </div>
      </div>
  <div class="mt-auto">
        <SearchPagination/>
        <ElementFooter />
  </div>  
  </div>
  </template>
  
  <script setup lang="ts">
  // Used by index.vue
  console.log("'search-layout' layout is selected");
  </script>
  
  <style scoped></style>
  