<template>
	<div id="modal" :class="store.backgroundForModal">
		<!-- Possibly gray,blur background-->
		<!-- Background color -->
		<div id="site-wrapper" class="bg-background">
			<TheNavbar />
			<main>
				<div>
					<slot />
				</div>
			</main>
			<LazyTheFooter />
		</div>
	</div>
</template>

<script setup lang="ts">
const store = useGeneralStore();
</script>

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
