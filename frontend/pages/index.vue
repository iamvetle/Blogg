<template>
	<div id="site-wrapper" v-if="store.isAuthenticated" class="mt-8">
		<div class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<!-- Kanskje en filtertool her?-->
			<ListArticles class="col-span-6 mx-auto" />
			<div class="col-span-4 mx-auto">

				<base-dropdown-menu>

					<template #filter>
						<FilterTool />
					</template>
					
				</base-dropdown-menu>

				<ListArticlesSidebar />
			</div>
		</div>
	</div>
	<div v-else>
		<Wait />
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';
import FilterTool from '~/components/utils/FilterTool.vue';

const store = useGeneralStore()

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