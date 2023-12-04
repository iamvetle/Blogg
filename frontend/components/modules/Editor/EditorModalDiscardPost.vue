<template>
        <UModal v-model="isOpen" prevent-close data-test="discard_modal">
            <UCard>
                <div data-test="inner_popup_modal" class="p-4">

                    <!-- Title -->
                    <div class="mb-8" data-test="modal_title">
                        <span class="text-center text-2xl text-onSurface">Do you want to discard this post?</span>
                    </div>

                    <!-- Options -->
                    <div data-test="options" class="flex justify-end space-x-6">
                        <button data-test="do_cancel_option"
                            class="p-2 rounded-lg border border-primary text-primary hover:shadow-md" @click="doCancel">
                            Cancel
                        </button>
                            
                        <button data-test="do_discard_option" id="cancel"
                            class="rounded-lg bg-error p-2 text-onError hover:shadow-md" @click="doDiscard">
                            Discard
                        </button>
                    </div>
                </div>
            </UCard>
        </UModal>
</template>

<script setup lang="ts">

const isOpen = ref(true)

const emit = defineEmits(["discardPost", "cancel"])

const doDiscard = () => {
    emit("discardPost")
}

const doCancel = () => {
    emit("cancel")
}

</script>

<style scoped></style>