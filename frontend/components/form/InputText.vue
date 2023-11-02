<template>
    <span>
        <input type="text" v-model="modelValue" v-bind="$attrs">
        <span v-if="label">{{ label }}</span>
    </span>
</template>

<script setup lang="ts">

const modelValue = defineModel()

defineProps<{
    label?:string
}>();

</script>

<style scoped>

</style>