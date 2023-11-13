<template>
    <button data-test="button" v-bind="$attrs">{{ text }}</button>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    text: string
}>(), {

})

</script>

<style scoped></style>