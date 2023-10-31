<template>
  <div>
    <button></button>
    <span v-if="sesamy">Please</span>
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