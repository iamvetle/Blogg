<template>
    	<div>
			<section class="bg-white dark:bg-gray-900">
				<p></p>
				<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
						<h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Siste blogginnlegg</h2>
						<p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Her er de siste blogginnleggene.</p>
					</div>

					<div id="main" class="grid gap-8 lg:grid-cols-2">
						<PostPartialView
						v-for="(post, index) in posts" 
						:key="post.id"
						:postDetail="post"
						/>
					</div>
				</div>
			</section>
		</div>    	
</template>

<script setup lang="ts">
//@ts-nocheck

import { storeToRefs } from 'pinia'
import { useGeneralStore } from '@/store/posts'


definePageMeta({
	layout:"index-layout",
	middleware:["check-token"]
})

const baseURL = "http://localhost:8888/api/feed/"

const store = useGeneralStore()
const posts = await fetchAllPosts(baseURL)
const account = null

</script>

<style scoped lang="scss">

</style>