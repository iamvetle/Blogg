<template>
	<div class="bg-white" id="site-wrapper">
		<div>
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<slot/>
			<TheFooter/>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>