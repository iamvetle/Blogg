<template>
    <div>
        <input type="checkbox" v-model="modelValue" v-bind="$attrs">
        <span v-if="label">{{ label }}</span>
    </div>
</template>

<script setup lang="ts">

const modelValue = defineModel()

defineProps<{
    label?:string
}>();

</script>

<style scoped>

</style>