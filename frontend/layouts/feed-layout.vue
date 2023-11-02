<template>
	<div id="site-wrapper" class="bg-background flex flex-col min-h-screen flex-1">
		<!-- Background color -->
		<div class="">
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<div class="flex-1">
				<slot />
			</div>
		</div>
		<div class="mt-auto">
			<FeedPagination v-if="postStore.posts" />
			<LazyTheFooter />
		</div>
	</div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore()

</script>

<style scoped></style>
