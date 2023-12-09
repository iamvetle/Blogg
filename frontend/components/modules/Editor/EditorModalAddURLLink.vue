<template>
    <!-- <UButton label="Open" @click="isOpen = true" /> -->
    <UModal v-model="isOpen" :overlay="false">
        <UCard class="bg-surfaceContainerLow shadow-lg">
            <div data-test="inner_popup_modal" class="px-2 text-onSurface">

                <!-- Title -->
                <div class="mb-8 flex space-x-1" data-test="modal_title">
                    <div class="flex items-center">
                        <img class="h-5" :src="urlIcon" alt="Link">
                    </div>
                    <span class="text-center text-2xl text-onSurface">Add url link</span>
                </div>

                <!-- Input -->
                <div data-test="url_link_input" class="mt-2 mb-4">
                    <InputText v-model.trim="input"
                        class="focus:shadow-md rounded-md ring-onPrimaryFixedVariant ring-1 outline-none focus:ring-2 focus:ring-onPrimaryContainer border-none w-full p-1"
                        />
                </div>

                <!-- Options -->    

                <div data-test="options" class="flex justify-end space-x-6">
                    <span>
                        <button data-test="cancel_adding_urlLink"
                            class="p-1 rounded-lg border-2 border-primary text-onSurface hover:shadow-md" @click="doAbort">
                            Cancel
                        </button>
                    </span>

                    <span>
                        <button data-test="confirm_adding_urlLink" id="cancel"
                            class="rounded-lg border-2 border-primary bg-primary p-1 text-onPrimary hover:shadow-md" @click="doConfirm">
                            Confirm
                        </button>
                    </span>
                </div>
            </div>


        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import urlIcon from '~/assets/icons/link_add.svg'

const emit = defineEmits(["confirmAddingUrl", "cancel"])


/**
 * I dont need to have a prop closing and opening it if I just have show hide outside instead
 */

/** Dictates whether the modal is shown or not */
const isOpen = ref(true)

/** 
 * Makes sure that when the modal is closed by clicking outside the emit that closes the "showModal" is emit 
 * I have to have this to make it possible to click outside of the modal and go back to editing. 
*/
watchEffect(() => {
    if (isOpen.value === false) {
        emit("cancel")
        isOpen.value = true
    }
})

/** The input text is stored here */
const input = ref("")

/** When "add" is pressed a confirmation message/emit is sent together with the string */
const doConfirm = () => {

    // if the input was something, the success emit is sent, if not the abort emit is sent
    if (input.value.trim() !== "") {
        if (typeof input.value === "string") {
            emit("confirmAddingUrl", input.value)
        }
    }
    // not all requirements where met
    emit("cancel")
}

const doAbort = () => {
    emit("cancel")
}


</script>

