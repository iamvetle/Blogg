<template>
	<div id="sidebar-component" class="w-full">
		<!-- 4/12 Sidebar -->
		<img id="profilbilde" :src="placeholder_user_profile_picture" class="w-[80px] h-[80px] mt-[40px] mb-[10px]">

		<div id="info-wrapper">
			<p id="username" class="font-bold leading-7">
				{{ props.username  }}
			</p>
			<!-- Through props - not the best-->
			<span id="followers">
				<p class="font-light text-sm leading-7">{{ followers }} followers</p>
			</span>
			<div id="bio" class="pt-4 pb-7 text-sm">
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex corrupti
					tempore nesciunt?
				</p>
			</div>

			<base-follow-button id="follow" :class="followClass" @click="getFollowUserAction" @mouseover="hoverAction('on')"
				@mouseleave="hoverAction('off')">
					{{ followText }}
			</base-follow-button>
			<div id="following" class="pt-10 pb-8">
				<p class="text-base pb-2">
					Following:
				</p>
				<ul class="pt-2 text-sm">
					<li class="items-center pt-2">
						<span class="items-center">
							<img :src="user_profile_picture" class="w-5 h-5 inline">
							<p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
							<img :src="three_dots" class="items-center pms-4 inline w-[15px] py-auto">
						</span>
					</li>
					<li class="items-center pt-2">
						<span class="items-center">
							<img :src="user_profile_picture" class="w-5 h-5 inline">
							<p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
							<img :src="three_dots" class="items-center pms-4 inline w-[15px] py-auto">
						</span>
					</li>
					<li class="items-center pt-2">
						<span class="items-center">
							<img :src="user_profile_picture" class="w-5 h-5 inline">
							<p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
							<img :src="three_dots" class="items-center pms-4 inline w-[15px] py-auto">
						</span>
					</li>
					<li class="items-center pt-2">
						<span class="items-center">
							<img :src="user_profile_picture" class="w-5 h-5 inline">
							<p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
							<img :src="three_dots" class="items-center pms-4 inline w-[15px] py-auto">
						</span>
					</li>
					<li class="items-center pt-2">
						<span class="items-center">
							<img :src="user_profile_picture" class="w-5 h-5 inline">
							<p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
							<img :src="three_dots" class="items-center pms-4 inline w-[15px] py-auto">
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import placeholder_user_profile_picture from '~/assets/placeholder-profile-picture.png'
import user_profile_picture from '~/assets/account-circle-line.svg'
import { useGeneralStore } from '~/store/generalStore';
import three_doties from '~/assets/three-dots.svg'
import { checkIfFollowingUser } from '../../../composables/checkIfFollowingUser';

const store = useGeneralStore()
const props = defineProps<{
	username :string,
	num_of_followers:number,
}>();

const three_dots = three_doties

const followers = computed(() => {
	return store.idArrayOfFollowingUsers.length
})
const followText = ref<string>("Follow")

const followingState = computed(() => {
	return checkIfFollowingUser(props.username)
})

const followClass = ref("bg-secondary px-3 py-2 text-onSecondary rounded-md text-sm hover:bg-secondaryFixedDim")

const hoverAction = (text: string) => {
	if (text === "on" && followingState.value === true && followText.value === "Following") {
		followText.value = "Unfollow"
		followClass.value = "bg-secondary text-onSecondary px-3 py-2 rounded-md text-sm hover:bg-secondaryFixed"


	} else if (text === "off" && followingState.value === true && followText.value === "Unfollow") {
		followText.value = "Following"
		followClass.value = "bg-secondary text-onSecondary px-3 py-2 rounded-md text-sm hover:bg-secondaryFixed"

	}
}

const getFollowUserAction = async () => {
	const followURL = `http://localhost:8888/api/${props.username }/follow/`
	const unfollowURL = `http://localhost:8888/api/${props.username }/unfollow/`

	if (followingState.value === false) {

		const response = await getFollowUser(followURL)
		console.log(response)

		if (response) {
			console.log("followuser")


			followText.value = "Following"
			followClass.value = "bg-secondary text-onSecondary px-3 py-2 rounded-md text-sm hover:bg-secondaryFixed"
			store.idArrayOfFollowingUsers.push(props.username)

		} else {
			console.log("something went wrong. did not manage to follow") // print to self
		}

	} else {

		const response = await getUnfollowUser(unfollowURL)
		console.log(response)

		if (response != null) {

			console.log("unfollowuser")
			followText.value = "Follow"
			followClass.value = "bg-secondary text-onSecondary px-3 py-2 rounded-md text-sm hover:bg-secondaryFixed"
			
			const index = store.idArrayOfFollowingUsers.findIndex((id) => id === props.username)
			store.idArrayOfFollowingUsers.splice(index, 1)
		}
	}

}

</script>

<style scoped></style>
