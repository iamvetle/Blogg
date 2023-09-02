<template>
	<div id="site-wrapper">

		<div v-if="store.isAuthenticated">
			<TheFeed/>
		</div>
		<div v-else>
			<Wait/>
		</div>

	</div> 	
</template>

<script setup lang="ts">

import { useGeneralStore } from '@/store/generalStore';
const store = useGeneralStore()

console.log(store.isAuthenticated)

onBeforeMount(() => {
	if (store.isAuthenticated === true) {
		setPageLayout("feed-layout")
	} else {
		setPageLayout("blank")
	}
})

</script>

<style scoped lang="scss">

</style>