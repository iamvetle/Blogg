<template>
	<div class="w-full">
		<UPagination
		v-model="paginationStore.currentPageNumber"
		:total="paginationStore.countOfPosts || 1"
		>
		</UPagination>
	</div>
</template>

<script setup lang="ts">

const paginationStore = usePaginationStore()

</script>

<style scoped>

</style>