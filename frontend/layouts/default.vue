<template>
	<div id="site-wrapper" class="bg-white" >
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

console.log("'default' layout is selected")


</script>

<style scoped>

</style>