<template>
  <div>
    <div id="navbar">
      <navbar />
    </div>
    <div id="content"> <!-- Everything goes in here-->
      <slot />
    </div> <!-- !! -->
  </div>
</template>

<script setup lang="ts">

import navbar from './parts/navbar.vue';

</script>

<style scoped>

</style>