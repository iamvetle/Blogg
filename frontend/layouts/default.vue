<template>
	<div id="modal" :class="store.backgroundForModal"> <!-- Possibly gray,blur background-->
		<!-- Background color -->
		<div id="site-wrapper" class="bg-background">
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<main>
				<div>
					<slot />
				</div>
			</main>
			<LazyTheFooter />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore'

const store = useGeneralStore()

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