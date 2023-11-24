<template>
    <div class="flex justify-center flex-col">
        <div id="upload_profile_picture" class="flex mb-2 justify-center">
            <UploadImage @file-change="handleFileChange" />
        </div>
        <span v-if="uploadedImage_display" class="text-center font-bold mb-2">Preview</span>
        <div id="profile_picture" class="flex justify-center">
            <BaseImage class="w-32 h-32 bg-onPrimary border-black border rounded-full mb-4 shrink-0" :src="profile_picture"
                alt="Profilbilde" />
        </div>
        <div class="flex space-x-2 justify-center" v-if="uploadedImage_display" data-test="upload_action_buttons">
            <BaseButton @click="handlePostNewProfileImage" text="Submit"
                class="hover:bg-tertiaryFixedDim hover:text-onTertiaryFixed text-xs rounded-md mt-1 p-1 bg-tertiary text-onTertiary"
                data-test="send_selected_image" />
            <BaseButton @click="cancelUpload"
                class="hover:bg-errorContainer hover:text-onErrorContainer text-xs rounded-md mt-1 p-1 bg-error text-onError"
                text="Cancel" data-test="cancel_image_upload_button" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png'


// The initial text for the input file (which is using this)
const label = ref<string | null>(null)
provide("label", label)


/** Here the object file is */
const uploadedImage_file = ref<any>(null)

/** The image that get's displayed and possibly selected as profile picture */
const uploadedImage_display = ref<string | null>(null)

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
        // an uplaoded image is showing
        label.value = "Change image"
        return uploadedImage_display.value
    } else if (loggedInUserStore.loggedInUserProfile.profile_picture) {
        // also changes the label value to change (since it already has a profile picture) - it is "changing" from something
        label.value = "Change image"
        return loggedInUserStore.loggedInUserProfile.profile_picture
    } else {
        // there is no image
        label.value = "Upload image"
        return placeholder_profile_picture
    }
})

const loggedInUserStore = useLoggedInUserStore()


/**
 * This function places an image in the image reactive variable so it is displayed as the profile picture temporarely
 * 
 * @param image - The selected image
 */
const handleFileChange = (image: any) => {
    if (image) {
        uploadedImage_file.value = image

        uploadedImage_display.value = URL.createObjectURL(image)
        label.value = "Change Image"

    }
}

const cancelUpload = () => {

    if (uploadedImage_display.value) {
        URL.revokeObjectURL(uploadedImage_display.value)
        uploadedImage_display.value = null
    }
    if (uploadedImage_file.value) {
        uploadedImage_file.value = null

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

    // it just has all of the funcitonalities I want right now - thats why I am also referancing it here
    /**
     * * It "restarts" / clears the file upload and image display
     */
    cancelUpload()
}

onUnmounted(() => {
    if (uploadedImage_display.value) {
        URL.revokeObjectURL(uploadedImage_display.value)
        uploadedImage_display.value = null
        uploadedImage_file.value = null
    }
})

</script>

<style scoped></style>