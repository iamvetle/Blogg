<template>
	<div id="site-wrapper" class="bg-background">
		<ClientOnly>
			<TheNavbar/>
		</ClientOnly>
		<main>
			<div>
				<slot />
			</div>
		</main>
	<div>
		<LazyFeedPagination v-if="postStore.posts" />
		<LazyTheFooter/>
	</div>
	</div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore()

</script>

<style scoped>
#site-wrapper {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

main {
	flex: 1;
}
</style>
