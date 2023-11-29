<template>
    <div>
        <Dialog :open="isOpen" @close="cancel">
            <div class="fixed flex items-center justify-center inset-0">

                <div class="rounded-xl bg-surfaceContainerHigh py-12 px-6">
                    <DialogPanel>
                        <div>
                            <DialogTitle class="text-center text-2xl text-onSurface">Do you want to publish the post?</DialogTitle>
                            <p>
                            </p>
                            <div class="mt-4">
                                <span id="choices" class="flex justify-end space-x-6">

                                    <span>
                                        <button id="confirm" class="p-1 text-primary
                                        
                                        "
                                            @click="cancel">
                                            No
                                        </button>
                                    </span>

                                    <span class="">
                                        <button id="cancel" class="p-1 text-primary
                                        " 
                                        @click="confirm"
                                        >
                                            Yes
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

import { useGeneralStore } from '~/store/generalStore';

/**
 * Is shown immidietly when the component is mounted.
 * 
 * Two option are displayed that both send an emit event:
 *  
 * Comfirm? or Cancel?
 */

const emit = defineEmits(["confirmPublished", "cancelPublished"])

const store = useGeneralStore()

const isOpen = ref<boolean>(true)

const confirm = () => {
    isOpen.value = false
    store.turnBackgroundForModel("")

    emit("confirmPublished")
}

onMounted(() => {
    store.turnBackgroundForModel("bg-scrim ")
})

const cancel = () => {
    isOpen.value = false
    store.turnBackgroundForModel("")

    emit("cancelPublished")
}

</script>

<style scoped></style>