<template>
    <!-- Main container for the textarea element -->
    <div>
        <!-- Textarea element bound with inputValue and handling input event -->
        <textarea :value="inputValue" v-bind="$attrs" @input="inputChange"></textarea>
    </div>
</template>
    
<script setup lang="ts">
import { defineEmits, ref, defineProps } from 'vue';

// Defines the custom events that this component can emit.
const emit = defineEmits(["emitInput"]);

// Reactive reference for the value of the textarea.
const inputValue = ref("");

/**
 * Handles the input event of the textarea.
 * 
 * @param {Event} event - The input event object.
 */
const inputChange = (event: Event) => {
    // Update inputValue with the current textarea value
    inputValue.value = (event.target as HTMLTextAreaElement).value;
    // Emit the updated value to the parent component
    emit("emitInput", inputValue.value);
};

// Define the props that this component accepts.
defineProps<{
    placeholder?: string; // Optional placeholder for the textarea
}>();
</script>
    
<style scoped>
/* Scoped CSS styles for this component */
</style>
  