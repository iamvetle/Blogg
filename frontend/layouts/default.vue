<template>
	<div id="modal" :class="store.backgroundForModal"> <!-- Possibly gray,blur background-->
		<!-- Background color -->
		<div id="site-wrapper" class="bg-background">
			<ClientOnly>
				<TheNavbar />
			</ClientOnly>
			<div class="">
				<slot />
			</div>
		</div>

		<div>
			<LazyTheFooter />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore'

const store = useGeneralStore()

</script>

<style scoped></style>  