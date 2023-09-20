<template>
	<div>

		<article class="p-6 bg-plain rounded-lg border-primary-base border-2 shadow-md ">
			<div id="grid-container" class="grid grid-cols-6 gap-x-5 gap-y-2 mx-2">
				
				<div class="col-start-1 col-span-4 inline-block">
					<div class="flex justify-between items-center text-gray-500">
						<span class="text-sm flex items-center"><img class="h-5 me-2" :src="placeholder_profile_picture"
								alt="Profilbilde"> <nuxt-link :to="author_link" class="flex items-center"><span v-if="author_full_name == ''" >Jonas Bakke</span>{{
									author_full_name }}</nuxt-link></span><span class="text-sm">{{
		postDetail.date_published }}</span>
					</div>
				</div>
				<div class="col-span-2"></div>
				

				<div class="col-start-1 col-span-4 inline-block">

					<h2 class="mt-1 mb-2 text-2xl font-bold tracking-tight text-gray-900">
						<nuxt-link :to="postLink">{{ postDetail.title }}</nuxt-link>
					</h2><!-- fix this to better later that is v-html-->
					<div class="mb-2 font-light text-gray-500 dark:text-gray-400"
						v-html="postDetail?.content_snippet || postDetail?.content">
					</div>
				</div>
				<div class="col-span-2">
					<img :src="placeholder_image" class="w-auto h-auto p-2">
				</div>

				<div class="col-start-1 col-span-4">
					<div class="flex items-center pt-2 pb-4">
						<div class="flex justify-between items-center w-full">
							<div id="tags" class="flex items-center space-x-2">
								<span
									class="flex items-center justify-center rounded-lg bg-gray-500 px-2 py-[4px] text-xs">sometag</span>
								<span
									class="flex items-center justify-center rounded-lg bg-gray-500 px-2 py-[3px] text-xs">sometag</span>
								<span
									class="flex items-center justify-center rounded-lg bg-gray-500 px-2 py-[3px] text-xs">sometag</span>
							</div>
							<div class="flex items-center">
								<nuxt-link :to="postLink"
									class="text-sm flex items-center font-medium text-primary-600 hover:underline">
									Read more
								</nuxt-link>
							</div>
					</div>
					</div>
				</div>
				<div class="col-span-2"></div>
			</div>


		</article>

	</div>
</template>

<script setup lang="ts">

import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png'
import placeholder_image from '~/assets/placeholder-image.jpg'

const { postDetail } = defineProps(["postDetail"]);
const postLink = `/post/${postDetail.id}`;
const author_full_name: string = `${postDetail.author.first_name} ${postDetail.author.last_name}`;
console.log(postDetail.author.username)
const author_link = `/user/${postDetail.author.username}`;

</script> 
