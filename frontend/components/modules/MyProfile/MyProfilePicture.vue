<template>
    <div>
        <BaseImage
        :src="profile_picture"
        v-bind="$attrs"
        alt="Profilbilde" 
        />
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png'

const loggedInUserStore = useLoggedInUserStore()

/** If the user doesnt have its own picture, this picture is used instead */
const placeholder = placeholder_profile_picture
const profile_picture = computed (() => loggedInUserStore.loggedInUserProfile.profile_picture ? loggedInUserStore.loggedInUserProfile.profile_picture : placeholder)

/**
 * * All attributes that are bassed with ($attrs) to this component goes right down to the child component "BaseImage" instead.
 * * This component works mostly like a wrapper.
 * 
 * * There is no need to pass a src down to THIS component. This is a "MyProfile" component, so it
 * * takes it's source directly from the loggedinuser store
 */

</script>

<style scoped>

</style>