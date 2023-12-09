<template>
    <!-- <UButton label="Open" @click="isOpen = true" /> -->
    <UModal v-model="isOpen" prevent-close>
        <UCard>
            <div data-test="inner_popup_modal" class="p-4">

                <!-- Title -->
                <div class="mb-8" data-test="modal_title">
                    <span class="text-center text-2xl text-onSurface">Do you want to publish the post?</span>
                </div>

                <!-- Options -->
                <div data-test="options" class="flex justify-end space-x-6">
                    <button data-test="do_abort_option"
                        class="p-2 rounded-lg border border-primary text-primary hover:shadow-md" @click="doAbort">
                        Cancel
                    </button>

                    <button data-test="do_confirm_option" id="cancel"
                        class="rounded-lg bg-primary p-2 text-onPrimary hover:shadow-md" @click="doConfirm">
                        Confirm
                    </button>
                </div>
            </div>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
/**
 * I dont need to have a prop closing and opening it if I just have show hide outside instead
 */

const isOpen = ref(true)

const emit = defineEmits(["confirm", "abort"])

const doConfirm = () => {
    emit("confirm")
}

const doAbort = () => {
    emit("abort")
}


</script>