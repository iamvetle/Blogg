<template>
  <div id="site-wrapper" class="bg-white">
    <div v-if="store.apiDownError === false">
      <ClientOnly>
        <ElementNavbar />
      </ClientOnly>
      <slot />
      <ElementFooter />
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
