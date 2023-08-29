<template>
	<div id="site-wrapper" class="bg-white"> <!-- Background color -->
		<TheHeader />
		<ClientOnly>
			<TheNavbar />
		</ClientOnly>        
		<slot />
		<TheFooter/>
	</div>
</template>

<script setup lang="ts"> // Used by index.vue

</script>

<style scoped>

</style>