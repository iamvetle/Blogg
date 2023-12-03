<template>
    <!-- <UButton label="Open" @click="isOpen = true" /> -->
    <UModal v-model="isOpen" prevent-close>
        <UCard class="bg-primaryContainer">
            <div data-test="inner_popup_modal" class="px-2 text-onPrimaryContainer">

                <!-- Title -->
                <div class="mb-8 flex space-x-1" data-test="modal_title">
                    <div class="flex items-center">
                        <img class="h-5" :src="urlIcon" alt="Link">
                    </div>
                    <span class="text-center text-2xl text-onPrimaryContainer">Add url link</span>
                </div>

                <!-- Input -->
                <div data-test="url_link_input" class="mt-2 mb-4">
                    <InputText v-model="input"
                        class="rounded-md border  focus:border-onPrimaryContainer border-2 w-full p-1 border-onPrimaryContainer"/>
                </div>

                <!-- Options -->    

                <div data-test="options" class="flex justify-end space-x-6">
                    <span>
                        <button data-test="cancel_adding_urlLink"
                            class="p-1 rounded-lg border border-primary text-primary hover:shadow-md" @click="doAbort">
                            Cancel
                        </button>
                    </span>

                    <span>
                        <button data-test="confirm_adding_urlLink" id="cancel"
                            class="rounded-lg bg-primary p-1 text-onPrimary hover:shadow-md" @click="doConfirm">
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

/**
 * I dont need to have a prop closing and opening it if I just have show hide outside instead
 */


const isOpen = ref(true)

watchEffect(() => {
    if (isOpen.value === false) {
        doAbort()
    }
})

const input = ref("")

const emit = defineEmits(["confirmAddingUrl", "cancel"])

const doConfirm = () => {

    if (input.value.trim() !== "") {
        if (typeof input.value === "string") {
            emit("confirmAddingUrl", input.value)

        }
    }
}

const doAbort = () => {
    emit("cancel")
}


</script>