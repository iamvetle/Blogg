<template>
				<div>
						<span class="mb-4 flex items-center">
							<img :src="user_picture" class="w-6 h-auto">
							<p class="ms-2">Mats Ole Bak</p>
						</span>
						<span class="mb-4 flex items-center">
							<img :src="user_picture" class="w-6 h-auto">
							<p class="ms-2">Mats Ole Bak</p>
						</span>
						<span class="mb-4 flex items-center">
							<img :src="user_picture" class="w-6 h-auto">
							<p class="ms-2">Mats Ole Bak</p>
						</span>
						<span class="mb-4 flex items-center">
							<img :src="user_picture" class="w-6 h-auto">
							<p class="ms-2">Mats Ole Bak</p>
						</span>
					</div>
</template>

<script setup lang="ts">

import profile_picture from '~/assets/placeholder-profile-picture.png'

const user_picture = profile_picture

</script>

<style scoped>

</style>