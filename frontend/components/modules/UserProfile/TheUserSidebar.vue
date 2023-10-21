<template>
	<div id="sidebar-component" class="w-full">
		<!-- 4/12 Sidebar -->
		<img id="profilbilde" :src="placeholder_user_profile_picture" class="w-[80px] h-[80px] mt-[40px] mb-[10px]">

		<div id="info-wrapper">
			
			<p id="username" class="font-bold leading-7" v-text="props.username"></p>

			<span id="followers">

				<slot name="amount-of-followers"></slot>

			</span>
			
			<div id="bio" class="pt-4 pb-7 text-sm">
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex corrupti
					tempore nesciunt?
				</p>
			</div>
			
			<div>
				<slot name="follow-button"></slot>
			</div>
			
			
			<!-- <base-follow-button id="follow" :class="followClass" @click="getFollowUserAction" @mouseover="hoverAction()"
				@mouseleave="leaveAction()">
				<span v-if="hoverState == false">
					{{ followText }}
				</span>
				<span v-if="hoverState == true">
					{{ hoverOverText }}
				</span>
			</base-follow-button> -->

		
		
		</div>
	</div>
</template>

<script setup lang="ts">

import placeholder_user_profile_picture from '~/assets/placeholder-profile-picture.png'
// import { useGeneralStore } from '~/store/generalStore';

// const store = useGeneralStore()
const props = defineProps<{
	username: string,
}>();
// const hoverState = ref(false)
// const followers = ref(0)
// const hoverOverText = "Unfollow"
// const followClass = ref("bg-primary px-3 py-2 text-onPrimary rounded-md text-sm hover:bg-primaryFixedDim")
// const followText = ref<string | null>(null)

// const followingState = computed(() => {
// 	return checkIfFollowingUser(props.username)
// })

// watchEffect(() => {
// 	let check = checkIfFollowingUser(props.username)

// 	if (check) {
// 		followText.value = "Following"
// 	} else {
// 		followText.value = "Follow"
// 	}
// })



// const hoverAction = () => {
// 	console.log("hoveraction called") // print to self
// 	if (followText.value === "Following") {
// 		hoverState.value = true

// 		followClass.value = "bg-primary text-onPrimary px-3 py-2 rounded-md text-sm hover:bg-error"

// 	}
// 	if (followText.value === "Follow") {
// 		followClass.value = "bg-primary text-onPrimary px-3 py-2 rounded-md text-sm hover:bg-primaryFixedDim"

// 	}
// }

// const leaveAction = () => {
// 	hoverState.value = false
// 	followClass.value = "bg-primary text-onPrimary px-3 py-2 rounded-md text-sm hover:bg-primaryFixedDim"

// }

// const getFollowUserAction = async () => {
// 	console.log("getfollwuser action called")
// 	const followURL = `http://localhost:8888/api/${props.username}/follow/`
// 	const unfollowURL = `http://localhost:8888/api/${props.username}/unfollow/`
	
// 	if (followingState.value === false) {

// 		const response = await getFollowUser(followURL)
// 		console.log(response)

// 		if (response) {
// 			console.log("followuser")

// 			followText.value = "Following"
// 			followers.value = followers.value + 1
// 			followClass.value = "bg-primary text-onPrimary px-3 py-2 rounded-md text-sm hover:bg-primaryFixedDim"
// 			store.idArrayOfLoggedInUserFollowingUsers.push(props.username)

// 		} else {
// 			console.log("something went wrong. did not manage to follow") // print to self
// 		}

// 	} else {

// 		const response = await getUnfollowUser(unfollowURL)
// 		console.log(response)

// 		if (response != null) {

// 			followText.value = "Follow"
// 			followers.value = followers.value - 1
// 			followClass.value = "bg-primary text-onPrimary px-3 py-2 rounded-md text-sm bg-primaryFixedDim"

// 			const index = store.idArrayOfLoggedInUserFollowingUsers.findIndex((id) => id === props.username)
// 			store.idArrayOfLoggedInUserFollowingUsers.splice(index, 1)
// 		}
// 	}
// 	// await getNormalUserProfile(userurl)

// }

// onMounted(() => {
// 	followers.value = props.num_of_followers
// })


</script>

<style scoped></style>
