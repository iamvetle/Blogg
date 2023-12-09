<template>
    <input ref="textInput" v-bind="$attrs" :value="modelValue" @change="updateValue" />
</template>
  
<script setup lang="ts">

const textInput = ref<HTMLInputElement | null>(null);

defineProps<{
    modelValue: string
}>();

defineExpose({
    textInput
})

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: any) => {
    emit('update:modelValue', event.target.value);
};
</script>
  
<style scoped>
/* Add your styling here */
</style>
  