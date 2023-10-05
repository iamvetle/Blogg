<template>
	<div id="aside" class="h-auto w-full mb-14">

		<div v-if="userdata" data-test="myprofile" class="w-full">
			<MyProfileCard :userProp="userdata" />
		</div>

		<hr class="mb-8">

		<div id="saved-posts" class="mx-auto w-full mb-8">
			<h3 class=" text-[28px] mb-9">
				Lagrede innlegg
			</h3>
			<div class="saved-article" v-if="userdata?.saved_posts">
				<ArticleSavedCard 
				v-for="post, index in userdata.saved_posts"
				:savedArticleProp="post"
				:key="index"
				/>
			</div>
			<p class="-mt-2 text-xs text-primary hover:text-primaryFixed">
				Se alle
			</p>
		</div>

		<hr class="mb-8">

		<div id="following-card" class="mx-auto w-full">
			<h3 class="text-[28px] mb-9">
				Du følger
			</h3>
			<div id="following" v-if="userdata">
				<Following 
				v-for="follower, index in userdata.followers"
				:followingProp="follower"
				:key="index"
				/>
			</div>
			<span class="text-xs text-primary hover:text-primaryFixed">Se alle</span>
		</div>

	</div>
</template>

<script setup lang="ts">

const userdata = ref<null | PersonalUserType>(null)

onBeforeMount(async () => {
	const baseMyUserURL = "http://localhost:8888/api/min-side/"

	userdata.value = await fetchPersonalUser(baseMyUserURL)

	console.log(userdata.value.data) // print to self
})

</script>

<style scoped></style>