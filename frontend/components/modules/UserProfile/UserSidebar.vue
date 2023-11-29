<template>
	<div id="sidebar-component" class="w-full">
		<BaseImage date-test="user_profile_picture" :src="profilePic" class="w-[80px] h-[80px] mt-[40px] mb-[10px]" />

		<div>
			
			<p id="username" class="font-bold leading-7" v-text="username"></p>

			<span>
				<slot name="amount-of-followers"></slot>
			</span>
			
			<!--
				TODO Fix this later to the proper "bio" of the user / and a proper step-in
			-->
			<div id="bio" class="pt-4 pb-7 text-sm">
				<slot name="bio">
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex corrupti
						tempore nesciunt?
					</p>
				</slot>
			</div>
			
			<div>
				<slot name="follow-button"></slot>
			</div>
		
		</div>
	</div>
</template>

<script setup lang="ts">

/**
 * @todo Change the placeholder image to the actual image 
 * of the user
 */
import placeholder_user_profile_picture from '~/assets/placeholder-profile-picture.png'

/**
 * The username that is going to be rendered 
 * 
 * @param username The username 
 */
const props = defineProps<{
	username: string,
	profilePicture?: string|null,
}>();

/**
 * If no profile picture prop is passed, then a placeholder is used
 */
const profilePic = computed(() => {
	if (props.profilePicture) {
		return props.profilePicture
	} else {
		return placeholder_user_profile_picture
	}
})

</script>

<style scoped></style>
