<template>
	<span :class="class">
		{{ text }}
	</span>
</template>

<script setup lang="ts">
/**
 * * Takes the text prop as a NAME and not as an actual tag type
 */

//@ts-ignore
const props = withDefaults(defineProps<{
	text:string,
	class?:string,
}>(), {
	text:"text",
	class:"tag text-xs py-1 px-1 bg-primary text-onPrimary rounded-lg"
})

</script>

<style scoped></style>