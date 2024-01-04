<template>
	<div
		v-if="postStore.posts"
		id="site-wrapper"
		class="bg-background text-onBackground"
	>
	<hr class="mb-16" />

		<div v-if="postStore.posts.results" id="content">
			<div class="article" v-for="post in postStore.posts.results" :key="post.id">
				<FeedPostPreviewCard :post="post" v-if="post"/>
				<hr class="mb-16" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

const postStore = usePostStore();

</script>

<style scoped></style>
