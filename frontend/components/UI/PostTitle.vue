<template>
	<h1 v-bind="$attrs">{{ title }}</h1>
</template>

<script setup lang="ts">
/**
 * Displays the text prop
 */

defineProps<{
	title: string;
}>();
</script>

<style scoped></style>
