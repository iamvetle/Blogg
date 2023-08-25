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

import { storeToRefs } from 'pinia'
import { useGeneralStore } from '@/store/posts'

definePageMeta({
	layout:"index-layout",
})
const store = useGeneralStore()
const { posts } = storeToRefs(store)
const account = null

//const { data } = await useFetch("/api/allposts")
//console.log(data.value)

const fetchPosts = () => {
	store.fetchAllPosts()
}

onMounted(fetchPosts)

</script>

<style scoped lang="scss">

</style>


<!-- possible view 2:? -->

<!-- <section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
	  <div class="-my-8 divide-y-2 divide-gray-100">
		<div class="py-8 flex flex-wrap md:flex-nowrap">
		  <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
			<span class="font-semibold title-font text-gray-700">CATEGORY</span>
			<span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
		  </div>
		  <div class="md:flex-grow">
			<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">Bitters hashtag waistcoat fashion axe chia unicorn</h2>
			<p class="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
			<a class="text-indigo-500 inline-flex items-center mt-4">Learn More
			  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path d="M5 12h14"></path>
				<path d="M12 5l7 7-7 7"></path>
			  </svg>
			</a>
		  </div>
		</div>
		<div class="py-8 flex flex-wrap md:flex-nowrap">
		  <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
			<span class="font-semibold title-font text-gray-700">CATEGORY</span>
			<span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
		  </div>
		  <div class="md:flex-grow">
			<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">Meditation bushwick direct trade taxidermy shaman</h2>
			<p class="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
			<a class="text-indigo-500 inline-flex items-center mt-4">Learn More
			  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path d="M5 12h14"></path>
				<path d="M12 5l7 7-7 7"></path>
			  </svg>
			</a>
		  </div>
		</div>
		<div class="py-8 flex flex-wrap md:flex-nowrap">
		  <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
			<span class="font-semibold title-font text-gray-700">CATEGORY</span>
			<span class="text-sm text-gray-500">12 Jun 2019</span>
		  </div>
		  <div class="md:flex-grow">
			<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">Woke master cleanse drinking vinegar salvia</h2>
			<p class="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
			<a class="text-indigo-500 inline-flex items-center mt-4">Learn More
			  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path d="M5 12h14"></path>
				<path d="M12 5l7 7-7 7"></path>
			  </svg>
			</a>
		  </div>
		</div>
	  </div>
	</div>
  </section> -->