<template>
  <span class="rad flex items-center justify-between">
    <span class="flex items-center">
      <input
        id=""
        type="checkbox"
        name="valg1"
      >
      <span>{{ choice }}</span>
    </span>
    <span>{{ count }}</span>
  </span>
</template>

<script setup lang="ts">

const { choice, count } = defineProps({
  "choice":String |  Number, 
  "count":String | Number, 
})

</script>

<style scoped></style>