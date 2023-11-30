<template>
    <textarea v-bind="$attrs" :value="modelValue" @change="updateValue"></textarea>
</template>
  
<script setup lang="ts">

defineProps<{
    modelValue: string
}>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (event:any) => {
    emit('update:modelValue', event.target.value);
};
</script>
  
<style scoped>
/* Add your styling here */
</style>
  