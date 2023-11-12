<template>
  <div>
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