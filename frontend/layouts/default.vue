<template>
  <div id="site-wrapper" class="bg-white ">
    <div v-if="store.apiDownError === false" class="min-h-screen flex flex-col">
      <ClientOnly>
        <ElementNavbar />
      </ClientOnly>
<div class="flex-1">
        <slot/>
  
</div>      <div class="">
        <ElementFooter />
      </div>
    </div>
    <div v-else>
      <ErrorAPIDown/>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useGeneralStore } from '~/store/generalStore';
const store = useGeneralStore()

console.log("'default' layout is selected");
</script>

<style scoped></style>
