<template>
	<span class="tag text-xs py-1 px-1 bg-primary text-onPrimary rounded-lg">
		{{ textProp.name }}
	</span>
</template>

<script setup lang="ts">

const { textProp } = defineProps(["textProp"])

</script>

<style scoped></style>