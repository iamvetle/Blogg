<template>
    <div>
        <textarea v-model="modelValue" v-bind="$attrs"></textarea>
        <span v-if="label">{{ label }}</span>
    </div>
</template>

<script setup lang="ts">

const modelValue = defineModel<any>()

defineProps<{
    label?:string
}>()

</script>

<style scoped>

</style>