<template>
<div id="searchbar-wrapper">
	<input
	v-model.trim="search_input"
	type="text"
	class=" bg-surface text-onSurface shadow-sm rounded-md h-10 md:max-w-[250px] max-w-[175px] hidden items-center sm:flex"
	placeholder="Søk.."
	@keyup.enter="$emit('searchDo', search_input)"
	>
</div>
</template>

<script setup lang="ts">

defineEmits(['searchDo'])

const search_input = ref("")
</script>

<style scoped></style>