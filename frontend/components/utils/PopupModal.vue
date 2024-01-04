<template>
    <div>
        <UModal v-model="isOpen" prevent-close>
            <UCard>
                <div data-test="inner_popup_modal" class="p-4">


                    <span class="text-center text-2xl text-onSurface">Do you want to publish the post?</span>
                    <p>
                    </p>
                    <div class="mt-4">
                        <span id="choices" class="flex justify-end space-x-6">

                            <span>
                                <button data-test="do_abort_option" class="p-1 text-primary
                                        
                                        " @click="doAbort">
                                    {{ abortText }}
                                </button>
                            </span>

                            <span class="">
                                <button data-test="do_confirm_option" id="cancel" class="p-1 text-primary
                                        " @click="doConfirm">
                                    {{ confirmText }}
                                </button>
                            </span>

                        </span>
                    </div>
                </div>


            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
/**
 * I dont need to have a prop closing and opening it if I just have show hide outside instead
 */


const isOpen = ref(true)

const emit = defineEmits(["confirm", "abort"])

withDefaults(defineProps<{
    // isOpen: boolean;
    confirmText?: string;
    abortText?: string;
}>(), {
    confirmText: "Confirm",
    abortText: "Abort"

})

const doConfirm = () => {
    emit("confirm")
}

const doAbort = () => {
    emit("abort")
}


</script>