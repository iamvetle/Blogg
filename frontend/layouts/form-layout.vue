<template>
	<div
	id="site-wrapper"
	class="bg-surface flex flex-col min-h-screen"
	>
	<div
		v-if="store.apiDownError === false"
		class="flex-1 flex flex-col"
	>
		<ClientOnly>
		<TheNavbar />
		</ClientOnly>
		<div class="flex-1">
		<slot />
		</div>
	</div>
	<div
		v-else
		class="flex-1"
	>
		<ErrorAPIDown />
	</div>
	<div class="mt-auto">
		<LazyTheFooter />
	</div>
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const store = useGeneralStore()

console.log("'form-layout' layout is selected");
</script>

<style scoped></style>
