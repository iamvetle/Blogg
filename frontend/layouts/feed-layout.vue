<template>
	<div id="site-wrapper" class="bg-background">
		<!-- Background color -->
		<div class="">
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<div>
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
