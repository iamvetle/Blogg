<template>
    <!-- Textarea component with external binding -->
    <div>
        <!-- Textarea element with value bound to the modelValue prop and input event handling -->
        <textarea :minlength="minlength" :maxlength="maxlength" cols="40" class="rounded-md" :value="modelValue" @input="handleInput" v-bind="$attrs"></textarea>
    </div>
</template>
  
<script setup lang="ts">

// Receives 'modelValue' prop for v-model binding. This prop represents the current value of the textarea.
withDefaults(defineProps<{
    modelValue: string;
    minlength?:number;
    maxlength?:number;
}>(), {
    minlength:3,
    maxlength:500
});

// Emits 'update:modelValue' event which is essential for the v-model binding in the parent component.
const emit = defineEmits(['update:modelValue']);

/**
 * Handles the input event from the textarea.
 * Emits an 'update:modelValue' event with the new value, allowing the parent component to update its data.
 * @param {Event} event - The input event object.
 */
const handleInput = (event: any) => {
    emit('update:modelValue', event.target.value);
};
</script>
  
<style scoped>
/* Scoped CSS for the textarea component */
</style>
  