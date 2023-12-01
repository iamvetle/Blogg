<template>
    <div class="bg-primary rounded-lg p-6">
        <div class="px-5 py-8 bg-onPrimary border-primary border rounded-md">
            <h2 class="text-xl font-bold mb-4">
                My Bio
            </h2>


            <div data-test="bio_input_output" id="bio-text" class="break-words">
                <InputTextarea maxlength="275" :class="borderAndRingClass" class="py-4 mb-1 border-none resize-none rounded-lg w-full
                
                hover:ring-primaryContainer
                hover:ring-2
                
                focus:ring-primary
                focus:ring-2
                " v-model.trim="bioText" id="bio" placeholder="Write bio here" />
            </div>
            <div v-if="showSaveBioInputButton" data-test="submit_bio_input_change">
                <BaseButton
                    class="float-right rounded-lg mb-2 p-1 text-sm text-onPrimary hover:text-onPrimaryFixed bg-primary hover:bg-primaryFixed hover:shadow-sm"
                    text="Save change" type="submit" @click="handleBioChange" />
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

/** Controls if the ring/border is shown at "default" element state (no focus, hover etc.) */
const borderAndRingClass = ref("")

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

const showSaveBioInputButton = computed(() => {
    /** There is not text input - the button is not shown */
    if (bioText.value === "") {
        borderAndRingClass.value = ""
        return false
        /** There is text input but it is the excact same as it initially was - the button is not shown*/
    } else if (bioText.value === loggedInUserStore.loggedInUserProfile.bio) {
        borderAndRingClass.value = ""
        return false
        /** Otherwise, the button is shown */
    } else {
        /** Makes a red ring around the bio input indicating attention */
        borderAndRingClass.value = "ring-error ring-2"
        return true
    }
})

/**
 * emits a message to the parent component saying that the input wants to ?be? the bio text
 */
const handleBioChange = () => {
    emit("bioUpdate", bioText.value)
}




/**
 * Has the bio part of the minkonto page
 */

</script>

<style scoped></style>