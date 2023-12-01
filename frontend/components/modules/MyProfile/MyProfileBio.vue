<template>
    <div class="bg-primary rounded-lg p-6">
        <div class="px-5 py-7 bg-onPrimary border-primary border rounded-md">
            <h2 class="text-xl font-bold mb-4">
                Bio
            </h2>
                <div data-test="submit_bio_input_change">
                    <BaseButton
                    text="Save change"
                    type="submit"
                    v-if="showSaveBioInputButton"
                    />
                </div>
            
            <div data-test="bio_input_output" id="bio-text" class="break-words">
                <InputTextarea maxlength="275" class="py-4 border-none resize-none rounded-lg w-full
                
                hover:ring-primaryContainer
                hover:ring-2
                
                focus:ring-primary
                focus:ring-2
                "
                
                v-model.trim="bioText" id="bio"
                    placeholder="Write bio here"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import BaseButton from '~/components/base/BaseButton.vue';

const emit = defineEmits(["bioUpdate"])

const loggedInUserStore = useLoggedInUserStore()
const bioText = ref<any>("")

const showSaveBioInputButton = ref(true)

/**
 * Places the initial bio value when component is loaded
 */
onMounted(() => {
    bioText.value = loggedInUserStore.loggedInUserProfile.bio
})



/**
 * ! fiks det her. slik at jeg må trykke på knappen for å gjøre en permanent endrin
 * ! på backend og ikke gjøre det every tiem the input changes og emit up
 */
/**
 * Updates the bio value / emits and event when the value with v-model changes
 */
watchEffect(() => {
    emit('bioUpdate', bioText.value)
    showSaveBioInputButton.value = false

})

watch(bioText.value, (newBioText, oldBioText) => {

    if (bioText.value == "")

    showSaveBioInputButton.value = true

})





/**
 * Has the bio part of the minkonto page
 */

</script>

<style scoped></style>