<template>
    <div>
        <div id="profile_picture" class="flex justify-center">
            <BaseImage class="w-32 h-32 bg-onPrimary rounded-full mb-4 shrink-0" :src="profile_picture" alt="Profilbilde" />
        </div>
        <div id="upload_profile_picture" class="flex flex-col justify-center">
            <UploadImage @file-change="handleFileChange" />
            <BaseButton @click="handlePostNewProfileImage" v-if="uploaded_image" text="Submit" class="text-xs rounded-md mt-1 p-1 bg-tertiary text-onTertiary" data-test="send_selected_image"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png'

/** The image that get's displayed and possibly selected as profile picture */
const uploaded_image = ref<string | null>(null)

/** The image that will actually be displayed */
const profile_picture = computed(() => {
    /**
     * A picture has been uploaded, then that one is displayed
     * * ELSE IF
     * No picture has been uploaded so that existing profile_picture is used
     * * OTHERWISE
     * A temporary place-in picture is shown if none of the above
     */
    if (uploaded_image.value) {
        return uploaded_image.value
    } else if (loggedInUserStore.loggedInUserProfile.profile_picture) {
        return loggedInUserStore.loggedInUserProfile.profile_picture
    } else {
        return placeholder_profile_picture
    }
})

const loggedInUserStore = useLoggedInUserStore()

/** 
 * If the user doesnt have its own picture, this picture is used instead 
 * 
 * When an image upload happens 
 */

onMounted(() => {
})


/** 
 * If the user doesnt have a profile picture a placeholder is put there instead
 */

/**
 * This function places an image in the image reactive variable so it is displayed as the profile picture temporarely
 * 
 * @param image - The selected image
 */
const handleFileChange = (image: any) => {
    if (image) {
        uploaded_image.value = image
    }
}

const handlePostNewProfileImage = (image:any) => {

}

</script>

<style scoped></style>