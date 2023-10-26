<template>
	<span :class="props.class" v-bind="$attrs">
		{{ props.text }}
	</span>
</template>

<script setup lang="ts">


const props = withDefaults(defineProps<{
	text:string,
	class?:string
}>(), {
	text:"text",
	class:"tag text-xs py-1 px-1 bg-primary text-onPrimary rounded-lg"
})

</script>

<style scoped></style>