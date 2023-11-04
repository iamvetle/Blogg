
<template>
<div id="searchbar-wrapper">
	<input
	v-bind="$attrs"
	v-model.trim="search_input"
	type="text"
	placeholder="Søk.."
	@keyup.enter="handleSearch"
	>
</div>
</template>

<script setup lang="ts">

const emit = defineEmits(['searchAction'])

const search_input = ref("")

const handleSearch = () => {
	
	emit("searchAction", search_input.value)

	search_input.value = ""
	
}
</script>

<style scoped></style>