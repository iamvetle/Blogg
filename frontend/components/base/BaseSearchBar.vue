<template>
<div id="searchbar-wrapper">
	<input
	v-bind="$attrs"
	v-model.trim="search_input"
	type="text"
	placeholder="Søk.."
	@keyup.enter="handleEnter"
	>
</div>
</template>

<script setup lang="ts">

const emit = defineEmits(['searchDo'])

const search_input = ref("")

const handleEnter = () => {
	
	emit("searchDo", search_input.value)

	search_input.value = ""
	
}
</script>

<style scoped></style>