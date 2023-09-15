<template>
<article
	class="p-6 bg-plain rounded-lg border-primary-base border-2 shadow-md">

	<div class="flex justify-end items-center mb-5 text-gray-500">
	<span class="text-sm">{{ postDetail.date_published }}</span>
	</div>
	<h2
	class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
	>
	<a href="#">{{ postDetail.title }}</a>
	</h2><!-- fix this to better later that is v-html--> 
	<div class="mb-5 font-light text-gray-500 dark:text-gray-400" v-html="postDetail?.content_snippet || postDetail?.content"> 
	</div>
	<div class="flex justify-between items-center">
	<div class="flex items-center space-x-4">
		<img
		:src="profile_image"
		class="w-7 h-7 rounded-full"
		/>
		<nuxt-link :to="author_link">
		<span class="font-medium dark:text-white">
			{{  postDetail.author.username }}
		</span>
		</nuxt-link>
	</div>	
	<nuxt-link
		:to="postLink"
		class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
	>
		Read more
		<svg
		class="ml-2 w-4 h-4"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		>
		<path
			fill-rule="evenodd"
			d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
			clip-rule="evenodd"
		></path>
		</svg>
	</nuxt-link>
	</div>
</article>
</template>

<script setup lang="ts">
import no from '~/assets/no.png'

const { postDetail } = defineProps(["postDetail"]);
const postLink = `/post/${postDetail.id}`;
const author_full_name:string = `${postDetail.author.first_name} ${postDetail.author.last_name}`  ;
console.log(postDetail.author.username)
const author_link = `/user/${postDetail.author.username}`;

const profile_image = no

</script> 
