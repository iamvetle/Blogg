<template>
    <label :class="wrappClass">
        <input type="checkbox" v-model="localChecked" @change="handleChange" class="prose" v-bind="$attrs" />
        <span v-if="label">{{ label }}</span>
    </label>
</template>
  
<script setup lang="ts">
/**
 * Checkbox Component
 * 
 * This component creates a customizable checkbox with an optional label. It supports v-model for binding the checkbox state.
 * It is styled with the "prose" class for a gray appearance when checked.
 * 
 * @component
 * @example <caption>Basic usage:</caption>
 * <Checkbox v-model="isChecked" label="Accept Terms" />
 * 
 * @example <caption>With custom wrapper class:</caption>
 * <Checkbox v-model="isChecked" label="Accept Terms" wrappClass="custom-class" />
 */

defineOptions({
    inheritAttrs: false
});

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
    /**
     * The model value for the checkbox, typically bound using v-model.
     */
    modelValue: any,

    /**
     * Optional label text to display next to the checkbox.
     */
    label?: string,

    /**
     * Optional CSS class for the label wrapper element.
     */
    wrappClass?: string
}>(), {
    wrappClass: "flex items-center space-x-2"
});

/**
 * ! I know it is better to do it this way but I do not understand why especcialy why I have to have check if it is "null" first
 * TODO to find that out ^
 */
const localChecked = ref(props.modelValue ? JSON.parse(JSON.stringify(props.modelValue)) : null)

/**
 * Handles change event of the checkbox, emitting the updated value.
 */
const handleChange = () => {
    emit('update:modelValue', localChecked.value);
};

</script>
  