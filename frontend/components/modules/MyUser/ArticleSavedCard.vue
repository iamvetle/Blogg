<template>
	<div class="flex pb-8">
		<img :src="article_image" class="w-14 h-12">
		<div class="ml-2" v-if="savedArticleProp">
			<span @click="redirect_to_post_page(savedArticleProp.post)" class="cursor-pointer flex ms-1 font-bold">
				{{ savedArticleProp.post.title }}
			</span>
			<span class="flex">
				<span><svg width="24" height="24" viewBox="0 0 24 24" class="fill-onBackground"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6.93912 14.0327C6.7072 14.6562 6.51032 15.233 6.33421 15.8154C7.29345 15.1188 8.43544 14.6766 9.75193 14.512C12.2652 14.1979 14.4976 12.5384 15.6279 10.4535L14.1721 8.99878L15.5848 7.58407C15.9185 7.24993 16.2521 6.91603 16.5858 6.58237C17.0151 6.15301 17.5 5.35838 18.0129 4.21479C12.4197 5.08172 8.99484 8.50636 6.93912 14.0327ZM17 8.99728L18 9.99658C17 12.9966 14 15.9966 10 16.4966C7.33146 16.8301 5.66421 18.6635 4.99824 21.9966H3C4 15.9966 6 1.99658 21 1.99658C20.0009 4.99392 19.0018 6.99303 18.0027 7.99391C17.6662 8.33038 17.3331 8.66372 17 8.99728Z"
							fill="black" />
					</svg>
				</span>
				<span class="flex ms-1">
					<span @click="redirect_to_author_page(savedArticleProp.user)" class="cursor-pointer">
						{{ savedArticleProp.user.username }}
					</span>
				</span>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">

// temperory solution
const article_image = "https://picsum.photos/500/300"

const { savedArticleProp } = defineProps(['savedArticleProp'])

const redirect_to_post_page = async (post: SnippetPostSingleType) => {
	const post_article_page = post.id

	return await navigateTo(`/post/${post_article_page}`)
}

const redirect_to_author_page = async (post: SnippetPostSingleType) => {
	const author_profile_page = post.username

	return await navigateTo(`/user/${author_profile_page}`)
}


</script>

<style scoped></style>