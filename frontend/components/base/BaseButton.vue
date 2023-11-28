<template>
    <button data-test="button">{{ text }}</button>
</template>

<script setup lang="ts">

defineProps<{
    text: string
}>()

</script>

<style scoped></style>