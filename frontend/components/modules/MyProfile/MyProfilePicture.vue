<template>
    <div>
        <div id="profile_picture" class="flex justify-center">
            <BaseImage class="w-32 h-32 bg-onPrimary rounded-full mb-4 shrink-0" :src="profile_picture" alt="Profilbilde" />
        </div>
        <div id="upload_profile_picture" class="flex flex-col justify-center">
            <UploadImage @file-change="handleFileChange" />
            <BaseButton @click="handlePostNewProfileImage" v-if="uploadedImage_display" text="Submit"
                class="text-xs rounded-md mt-1 p-1 bg-tertiary text-onTertiary" data-test="send_selected_image" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png'

/** Here the object file is */
const uploadedImage_file = ref<any>(null)

/** The image that get's displayed and possibly selected as profile picture */
const uploadedImage_display = ref<string| null>(null)

/** The image that will actually be displayed */
const profile_picture = computed(() => {
    /**
     * A picture has been uploaded, then that one is displayed
     * * ELSE IF
     * No picture has been uploaded so that existing profile_picture is used
     * * OTHERWISE
     * A temporary place-in picture is shown if none of the above
     */
    if (uploadedImage_display.value) {
        return uploadedImage_display.value
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
 * This function places an image in the image reactive variable so it is displayed as the profile picture temporarely
 * 
 * @param image - The selected image
 */
const handleFileChange = (image: any) => {
    if (image) {
        uploadedImage_file.value = image

        uploadedImage_display.value = URL.createObjectURL(image)

    }
}

const handlePostNewProfileImage = async () => {
    const profilePictureEditURL = "http://localhost:8888/api/min-side/profile_picture/edit/"

    if (uploadedImage_file.value) {
        const formData = new FormData();
        formData.append('profile_picture', uploadedImage_file.value); // 'imageFile' is the file to be uploaded

        const response = await postProfilePicture(profilePictureEditURL, formData)
        if (response) {
            await getLoggedInUserProfile("http://localhost:8888/api/min-side/")
            alert("successfully managed to edit profile picture of logged in user")
        }
    } else {
        console.error("can't handle an empty image upload") // print to self
    }

}

onUnmounted(() => {
    if (uploadedImage_display.value) {
        URL.revokeObjectURL(uploadedImage_display.value)
    }
})

</script>

<style scoped></style>