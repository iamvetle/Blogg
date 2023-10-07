<template>
	<div id="personal-user-card"
		class="mx-auto mb-8 px-8 py-4 rounded-lg text-onSecondaryContainer bg-secondaryContainer shadow-md w-full">
		<div class="mb-4 w-full flex flex-wrap min-w-0 items-center text-onPrimaryContainer">
			
			<img :src="profilePictureProp" class="w-20 h-auto text-onPrimaryContainer mr-4">
			
			<div class="min-w-0">
				<h2 id="card-username" class="text-4xl text-onPrimaryContainer whitespace-normal break-words">
					<slot name="username">Brukernavn</slot>

				</h2>
				<span>
					<p id="card-name" class="text-onPrimaryContainer ">
						<slot name="full-name">Fullt navn(har ikke fullt navn)</slot>
					</p>
				</span>
			</div>
		</div>
		<p class="text-onPrimaryContainer">
			
			<slot name="amount-of-followers">Antall følgere</slot>
			
		</p>
		<span class="text-onPrimaryContainer">
			<slot name="amount-of-saved-posts">Antall lagrede innlegg</slot>

		</span>
	</div>
</template>

<script setup lang="ts">

defineProps({
	profilePictureProp: String
})

</script>

<style scoped></style>