<template>
	<div  id="site-wrapper" v-if="store.isAuthenticated" class="mt-8">
		<div class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<ListArticles class="col-span-6 mx-auto" />
			<ListArticlesSidebar class="col-span-4 mx-auto" />
		</div>
	</div>
	<div v-else>
		<Wait />
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const store = useGeneralStore()

store.isAuthenticated

console.log(store.isAuthenticated);

watchEffect(() => {

	if (store.isAuthenticated == false) {
		setPageLayout("blank");
	}
})

watchEffect(() => {

	if (store.isAuthenticated == true) {
		setPageLayout("feed-layout");
	}
})

</script>

<style></style>