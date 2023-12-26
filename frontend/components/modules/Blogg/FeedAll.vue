<template>
	<div
		class="mt-8 max-w-[1100px] w-full mx-auto px-6 grid grid-cols-10 gap-28"
	>
		<div data-test="everything" class="col-span-6 mx-auto w-full">
			<FeedMain />
		</div>
		<div id="feed-sidebar" class="col-span-4 mx-auto w-full">
			<FeedSidebar />
		</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
