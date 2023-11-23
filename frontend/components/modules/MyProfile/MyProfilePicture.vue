<template>
    <div>
        <div id="profile_picture" class="flex justify-center">
            <BaseImage
            :src="profile_picture ? profile_picture : placeholder"
            v-bind="$attrs"
            alt="Profilbilde"
            />
        </div>
        <div v-if="profile_picture == null" id="upload_profile_picture">
            <UploadImage/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png'

defineOptions({
    // Need to do this so that I don't get duplicate attributes when doing $attrs
    inheritAttrs:false
})

const loggedInUserStore = useLoggedInUserStore()

/** If the user doesnt have its own picture, this picture is used instead */
const placeholder = placeholder_profile_picture

/** 
 * If the user doesnt have a profile picture a placeholder is put there instead
 */

/** (Possibly) the users profile picture */
const profile_picture = computed (() => loggedInUserStore.loggedInUserProfile.profile_picture )

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