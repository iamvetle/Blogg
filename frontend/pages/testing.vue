<template>
  <div class="min-h-screen">
    <Modal/>
  </div>
</template>

<script setup>

const sesamy = ref(false)

onMounted(() => {
  sesamy.value = getMethod()
})


</script>

<style scoped>

</style>