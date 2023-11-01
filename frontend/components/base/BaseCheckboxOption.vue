<template>
	<label class="flex items-center space-x-2">
		<span>
			<input type="checkbox" v-model="localChecked" @change="handleChange" class="prose" v-bind="$attrs" />
		</span>
		<span>{{ props.label }}</span>
	</label>
</template>
  
<script setup lang="ts">

/** NB! I am adding "prose" to the class just to get the checkbox gray instead of blue when checked */

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
	modelValue: any,
	label?: string,
	placeholder?: string

}>()

const localChecked = ref(props.modelValue);

const handleChange = () => {
	emit('update:modelValue', localChecked.value);
};
</script>
  