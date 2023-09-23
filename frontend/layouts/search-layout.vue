<template>
    <div id="site-wrapper" class="bg-white flex flex-col min-h-screen">
      <!-- Background color -->
      <div class="flex-1 flex flex-col">
        <ClientOnly>
          <TheNavbar />
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
import TheNavbar from '~/components/layout/TheNavbar.vue';

  // Used by index.vue
  console.log("'search-layout' layout is selected");
  </script>
  
  <style scoped></style>
  