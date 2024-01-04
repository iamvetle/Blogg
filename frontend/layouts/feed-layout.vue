<template>
	<div id="site-wrapper" class="bg-background">
		<TheNavbar />
		<main>
			<div>
				<slot />
			</div>
		</main>
		<div>
			<!-- <LazyFeedPagination /> -->
			<LazyTheFooter />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
#site-wrapper {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

main {
	flex: 1;
}
</style>
