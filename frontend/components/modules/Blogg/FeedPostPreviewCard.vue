<template>
	<div class="article grid-cols-12 grid gap-8 mb-16">

		<div id="left-col-article" class="col-start-1 col-end-9">
			
			<span class="flex items-center w-full mb-2">
				<span class="user-picture flex items-center">
					<slot name="profile_picture"></slot>
				</span>
				<span class="flex items-center justify-between w-full">

					<span class="flex items-center full_name">
						<slot name="author"></slot>

					</span>

					<slot name="date_published"></slot>

				</span>
			</span>
			<div class="mb-4 w-full">

				<slot name="title"></slot>


				<slot name="content"></slot>

			</div>

			<span class="flex items-center justify-between">
				<span class="flex items-center space-x-2">
					<slot name="lesmer"></slot>
				
				<span class="flex items-center">
					<slot name="tags"></slot>
				</span>
				</span>

				<span class="flex items-center">
					<span id="comments-count" class="me-2">
						<slot name="amount-of-comments"></slot>
					</span>

					<span id="save-article" class="me-2">
						<slot name="save-article-icon"></slot>
					</span>

					<span id="article-options" class="">

						<slot name="more-options-icon"></slot>

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

// temp solution


</script>

<style scoped></style>