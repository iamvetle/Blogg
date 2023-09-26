<template>
  <div class="flex flex-col">
    <span class="flex justify-between">
      <span>Merke</span>
      <span>^</span>
    </span>
  </div>
	
  <div class="border border-green-500 flex flex-col">
    <BaseCheckboxOption
      :choice="instance"
      :count="count"
    />
  </div>
</template>

<script setup lang="ts">

const instance = "red"
const count = 4

</script>

<style scoped>

</style>