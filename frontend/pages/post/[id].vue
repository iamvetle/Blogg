<template>
	<div class="prose max-w-3xl py-[100px] mx-auto">
		<div v-if="post" class="w-full px-[60px] py-[30px] bg-white">
			<h1 class="">
				{{ post.title }}
			</h1>
			<span class="mb-4 block">
				<p class="font-bold inline">
					- {{ post.author.username }}
				</p>
				<span class="text-xs float-right">Published {{ post.date_published }}</span>
			</span>

			<div>

				<div v-if="post.tags" class="mb-2 flex space-x-1" id="tags">
					<span class="flex" v-for="(tag, index) in post.tags">
						<BaseTag :text="tag" :key="index" />
					</span>
				</div>

				<!-- Obviously don't want both long term-->
				<div v-if="post.categories" class="mb-2 flex space-x-1" id="categories">
					<span class="flex" v-for="(category, index) in post.categories">
						<BaseTag :text="category" :key="index" />
					</span>
				</div>

			</div>

			<div class="mb-4" v-html="post.content"></div>
			
			<button class="border-2 bg-light-blue-400 rounded-lg py-1 px-2" @click="navigateTo('/')">
				Back
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">

// import noimage from '~/assets/noimage.jpg'

const post = ref<PostSingleType | null>(null);

onMounted(async () => {
	const route = useRoute();
	const postURL = `http://localhost:8888/api/post/${route.params.id}/`;


	/**
	 * Fetches the one post
	 */
	post.value = await fetchPost(postURL);
});


definePageMeta({
	layout: 'default'
})

</script>


<style scoped></style>