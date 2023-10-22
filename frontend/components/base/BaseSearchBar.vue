<template>
<div id="searchbar-wrapper">
	<input
	v-model.trim="search_input"
	type="text"
	class=" bg-surface text-onSurface shadow-sm rounded-md h-10 md:max-w-[250px] max-w-[175px] hidden items-center sm:flex"
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