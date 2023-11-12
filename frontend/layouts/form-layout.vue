<template>
	<!-- Background color -->
	<div id="site-wrapper" class="bg-surface">
		<ClientOnly>
			<TheNavbar />
		</ClientOnly>
		<main>
			<div>
				<slot />
			</div>
		</main>
		<TheFooter />
	</div>
</template>

<script setup lang="ts">

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
