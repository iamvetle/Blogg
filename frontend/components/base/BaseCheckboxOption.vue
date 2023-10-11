<template>
	<div class="flex items-center">
		<label class="flex items-center space-x-2">
			<input type="checkbox" v-model="localChecked" @change="handleChange" v-bind="$attrs"/>
			<span>{{ props.label }}</span>
		</label>
	</div>
</template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
	modelValue:any,
	label:string,
	placeholder?:string
	
}>()

const localChecked = ref(props.modelValue);

const handleChange = () => {
	emit('update:modelValue', localChecked.value);
};
</script>
  