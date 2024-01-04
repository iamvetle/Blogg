<template>
	<div class="w-full">
		<!--
			! a hydration error is happening here because the data fetching is done on the client side,
			! therefore the server does not render the pagination. but the client does. The error is in rendering this,
		-->
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