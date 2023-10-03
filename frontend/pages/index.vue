<template>
	<div id="site-wrapper">
		<div v-if="storeValue" class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<ListArticles class="col-span-6 mx-auto" />
			<ListArticlesSidebar class="col-span-4 mx-auto" />
		</div>
		<div v-else>
			<Wait />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const store = useGeneralStore()

const storeValue = computed(() => store.isAuthenticated);

console.log(store.isAuthenticated);

watch(storeValue, (newVal, oldVal) => {
	if (newVal !== oldVal) {
		setPageLayout("feed-layout");
	}
});

onBeforeMount(() => {
	if (store.isAuthenticated === true) {
		setPageLayout("feed-layout");
	} else {
		setPageLayout("blank");
	}
});

</script>

<style></style>