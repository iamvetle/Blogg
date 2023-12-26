<template>
	<div>
		<div v-if="isReady">
			<h2 class="mb-10 text-4xl" data-test="search-results">
				Søkeresultater for '{{ searchStore.searchPart }}'
			</h2>
		</div>
		<div v-else></div>
	</div>
</template>

<script setup lang="ts">
const searchStore = useSearchStore();

const isReady = computed(() => searchStore.searchPart);
</script>

<style scoped></style>
