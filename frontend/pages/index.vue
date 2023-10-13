<template>
	<div id="site-wrapper" v-if="store.isAuthenticated" class="mt-8">
		<div class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">
			<ListArticles class="col-span-6 mx-auto" />
			<div class="col-span-4 mx-auto">

				<base-dropdown-menu v-if="store.personalUser" class="mb-4">

					<template #filter>

						<FilterTool />

					</template>

				</base-dropdown-menu>

				<ListArticlesSidebar />
			</div>
		</div>
	</div>
	<div v-if="store.isAuthenticated != true">
		<Wait />
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';
import FilterTool from '~/components/utils/FilterTool.vue';

const store = useGeneralStore()

console.log(store.isAuthenticated); // print to self
/**
 * Updates the page layout to a plain one if you are 'unauthenticated'. 
 * The function 'watches' the 'global' variable that says if you are 'unauthenticated'.
 */
watchEffect(() => {
	if (store.isAuthenticated === false) {
		setPageLayout("blank");
	}
})
/**
 * Updates the page layout to one meant for 'feed/listing articles', if you are 'authenticated/logged in'. 
 * The function 'watches' the 'global' variable that says if you are 'authenticated'.
 */
watchEffect(() => {
	if (store.isAuthenticated === true) {
		setPageLayout("feed-layout");
	}
})

</script>

<style></style>