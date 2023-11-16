<template>
    <span>
        <input type="password" :value="modelValue" id="" @input="$emit('update:modelValue', ($event.target as any).value)" v-bind="$attrs">
        <span v-if="label">{{ label }}</span>
    </span>>
</template>

<script setup lang="ts">

defineProps<{
    modelValue:string
    label?:string
}>();

</script>

<style scoped>

</style>