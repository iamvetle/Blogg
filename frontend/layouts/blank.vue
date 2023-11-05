<template>
  <div id="modal" :class="store.backgroundForModal">
    <div id="site-wrapper" class="bg-surface">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore'

const store = useGeneralStore()

</script>

<style scoped></style>
