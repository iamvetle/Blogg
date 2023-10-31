<template>
	<div id="sidebar-component" class="w-full">
		<img id="profile-picture" :src="props.profilePicture ? props.profilePicture : placeholder" class="w-[80px] h-[80px] mt-[40px] mb-[10px]">

		<div id="info-wrapper">
			
			<p id="username" class="font-bold leading-7" v-text="props.username"></p>

			<span>

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
		
		</div>
	</div>
</template>

<script setup lang="ts">

/**
 * @todo Change the placeholder image to the actual image 
 * of the user
 */
import placeholder_user_profile_picture from '~/assets/placeholder-profile-picture.png'

const placeholder = ref(placeholder_user_profile_picture)

/**
 * The username that is going to be rendered 
 * 
 * @param username The username 
 */
const props = defineProps<{
	username: string,
	/** If a profile picture is passed as a prop, it is rendered, if
	 * not profile picture prop is provided, the placeholder image is used instead.
	 */
	profilePicture?: string,
}>();

</script>

<style scoped></style>
