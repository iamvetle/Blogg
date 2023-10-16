<template>
	<div class="article grid-cols-12 grid gap-8 mb-16">
		<div id="left-col-article" class="col-start-1 col-end-9">
			<span class="flex items-center w-full mb-2">
				<span class="user-picture flex items-center">
					<img v-show="!props.hideProfileImage" :src="account_picture" alt="Bruker profilbilde" class=" w-6 h-auto me-2">
				</span>
				<span class="flex items-center justify-between w-full">

					<span class="flex items-center full_name">
						<slot name="author">Author name.</slot>

					</span>

					<slot name="date_published">Date published.</slot>

				</span>
			</span>
			<div class="mb-4 w-full">

				<slot name="title">Title goes here</slot>


				<slot name="content">The content/body goes here.</slot>

			</div>

			<span class="flex items-center justify-between">
				<span class="flex items-center space-x-2">
					<slot name="lesmer"></slot>
				
				<span class="flex items-center">
					<slot name="tags"></slot>
				</span>
				</span>

				<span class="flex items-center">

					<span id="save-article" class="me-2 w-auto h-auto mx-auto flex items-center justify-center">
						<slot name="save-article-icon">Save.</slot>
					</span>

					<span id="article-options" class="w-auto h-auto mx-auto flex items-center justify-center">

						<slot name="more-options-icon">More.</slot>

					</span>

				</span>
			</span>
		</div>

		<div id="right-col-article" class="col-span-4 flex items-center justify-center">
			<slot name="article_image">This is were the article image is.</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import account_picture from '~/assets/account-pin-circle-line.svg'

const props = withDefaults(defineProps<{
	hideProfileImage?:boolean
}>(), {
	hideProfileImage:false
})

// temp solution


</script>

<style scoped></style>