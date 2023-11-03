<template>
    <div>
        <button type="button" id="open" @click="setOpen">Open</button>

            <Dialog :open="isOpen" @close="setClose">
                <div class="fixed w-full h-full flex items-center justify-center inset-0">

                    
                <div class="w-[500px] h-[250px] bg-primary text-onPrimary p-8">
                    <DialogPanel>
                        <div>
                            <DialogTitle class="text-center text-lg">Are you ready to publish the post?</DialogTitle>
                            <p>
                            </p>
                            <div class="mt-16">
                                <span id="choices" class="flex justify-center space-x-24">
                                    <span class="p-4 bg-onPrimary text-primary"><button id="close" @click="setClose" >Yes</button></span>
                                    <span class="p-4 bg-onPrimary text-primary"><button @click="setClose">No</button></span>
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

const emit = defineEmits()

const props = defineProps<{
    
}>();

const selectedBeforePublished = () => {
    emit("controlForPublish")
}

const isOpen = ref<boolean>(false)

const setOpen = () => {
    isOpen.value = true
}

const setClose = () => {
    isOpen.value = false
}


</script>

<style scoped></style>