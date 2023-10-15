<template>
	<div id="site-wrapper" class="bg-background flex flex-col min-h-screen">
		<div id="modal-root"></div>

		<!-- Background color -->
		<div class="flex-1 flex flex-col">
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<div class="flex-1">
				<slot />
			</div>
		</div>
		<div class="mt-auto">
			<FeedPagination v-if="store.posts" />
			<TheFooter />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const store = useGeneralStore()

// Used by index.vue
console.log("'feed-layout' layout is selected");
</script>

<style scoped></style>
