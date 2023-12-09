<template>
  <div id="modal" :class="store.backgroundForModal">
    <!-- Background color -->
    <div id="site-wrapper" class="bg-surface">
      <main>
        <div>
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">

const store = useGeneralStore()

</script>

<style scoped>
#site-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
}
</style>
