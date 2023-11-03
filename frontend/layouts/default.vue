<template>
	<div id="site-wrapper" class="bg-background">
		<!-- Background color -->
		<div>
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<div class="">
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