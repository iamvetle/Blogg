<template>
	<div id="site-wrapper" class="bg-background text-onBackground">

		<TheNavbarr />

		<div id="main" class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28">

			<div id="content" class="col-span-6 mx-auto">

				<div class="article">
					<ArticleCardd 
					/>
					<hr class="mb-16">
				</div>

			</div>

			<div id="aside" class="col-span-4 h-fit mb-14 mx-auto">

				<div id="my-profile-card" v-if="user">
					<MyProfileCard 
					:userProp="user"
					/>
				</div>

				<hr class="mb-8">

				<div id="saved-posts" class="mx-auto w-full mb-8">
					<h3 class=" text-[28px] mb-9">Lagrede innlegg</h3>

					<div class="saved-article">
						<ModulesMyUserArticleSavedCard />
					</div>
					<p class="-mt-2 text-xs text-primary hover:text-primaryFixed">Se alle</p>
				</div>

				<hr class="mb-8">

				<div id="following-card" class="mx-auto w-full">
					<h3 class="text-[28px] mb-9">Følger</h3>
					<div id="following">
						<ModulesMyUserFollowing />
					</div>
					<span class="text-xs text-primary hover:text-primaryFixed">Se alle</span>
				</div>

			</div>

		</div>
	</div>
</template>

<script setup lang="ts">

import axios from 'axios'

import TheNavbarr from '~/components/layout/TheNavbarr.vue';
import ArticleCardd from '~/components/modules/Blogg/ArticleCardd.vue';
import MyProfileCard from '~/components/modules/MyUser/MyProfileCard.vue';
// import article_image from '~/assets/placeholder-image.jpg'

const user = ref<null | RandomAccount>(null)

const fetchUser = async()=> {
	const url = "https://random-data-api.com/api/v2/users?size=1"
	const response:RandomAccount = await axios.get(url)
	console.log(response.data)
	user.value = response.data

}


onMounted(fetchUser)

definePageMeta({
	layout: "blank"
})


</script>

<style scoped></style>