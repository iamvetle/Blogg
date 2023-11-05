<template>
    <div>
        <Dialog :open="isOpen" @close="setClose">
            <div class="fixed w-full h-full flex items-center justify-center inset-0">

                <div class="rounded-xl w-[500px] h-[250px] bg-primary text-onPrimary p-8">
                    <DialogPanel>
                        <div>
                            <DialogTitle class="text-center text-2xl">Are you ready to publish the post?</DialogTitle>
                            <p>
                            </p>
                            <div class="mt-16">
                                <span id="choices" class="flex justify-center space-x-24">

                                    <span>
                                        <button id="confirm" class="rounded-lg p-4 bg-onPrimary text-primary
                                        hover:p-5
                                        
                                        "
                                            @click="confirm">
                                            Confirm
                                        </button>
                                    </span>

                                    <span class="">
                                        <button id="cancel" class="rounded-lg p-4 bg-onPrimary text-primary
                                        hover:p-5   
                                        " 
                                        @click="cancel"
                                        >
                                            Cancel
                                        </button>
                                    </span>

                                </span>
                            </div>
                        </div>

                    </DialogPanel>
                </div>
            </div>

        </Dialog>
    </div>
</template>

<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    // DialogDescription,
} from '@headlessui/vue'

/**
 * Is shown immidietly when the component is mounted.
 * 
 * Two option are displayed that both send an emit event:
 *  
 * Comfirm? or Cancel?
 */

const emit = defineEmits(["confirmPublished", "cancelPublished"])

const isOpen = ref<boolean>(true)

const setClose = () => {
    isOpen.value = false
}

const confirm = () => {
    isOpen.value = false

    emit("confirmPublished")
}

const cancel = () => {
    isOpen.value = false

    emit("cancelPublished")

}

</script>

<style scoped></style>