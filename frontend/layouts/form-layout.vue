<template>
	<!-- Background color -->
	<div id="site-wrapper" class="bg-surface">
		<div>
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<div>
				<slot />
			</div>
		</div>
		<div>
			<LazyTheFooter />
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
