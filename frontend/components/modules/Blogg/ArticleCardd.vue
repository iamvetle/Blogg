<template>
	<div class="article grid-cols-12 grid gap-8 mb-16">
		<div id="left-col-article" class="col-start-1 col-end-9">
			<span class="flex items-center w-full mb-2">
				<span class="user-picture flex items-center">
					<img :src="account_picture" alt="Bruker profilbilde" class=" w-6 h-auto me-2">
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
				<slot name="lesmer"></slot>

				<span class="flex items-center">
					<slot name="tags"></slot>
				</span>

				<span class="flex items-center">
					
					<span id="save-article" class="me-2 w-auto h-auto mx-auto flex items-center justify-center">
						<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"
								fill="black" />
						</svg>

					</span>



					<span id="article-options" class="w-auto h-auto mx-auto flex items-center justify-center">

						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"
								fill="black" />
						</svg>


					</span>
				</span>
			</span>
		</div>

		<div id="right-col-article" class="col-span-4 flex items-center justify-center|">
			<slot name="article_image">This is were the article image is.</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import account_picture from '~/assets/account-pin-circle-line.svg'

// temp solution


</script>

<style scoped></style>