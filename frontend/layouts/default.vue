<template>
	<div id="site-wrapper" class="bg-background flex flex-col min-h-screen">
		<div id="modal-root"></div>

		<!-- Background color -->
		<div class="flex-1 flex flex-col mb-6">
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<div class="flex-1">
				<slot />
			</div>
		</div>
		<div class="mt-auto">
			<LazyTheFooter />
		</div>
	</div>
</template>
  
<script setup lang="ts">

</script>
  
<style scoped></style>
  