<template>
    <div id="root" v-if="isOpen" class="relative">
        <teleport to="#modal-root">
            <div id="modal" class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
                <div class="flex items-start justify-center min-h-screen pt-24 text-center">
                    <div class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2">
                        <p>{{ msg }}</p>
                        <button @click="isOpen = false">{{ closeMsg }}</button>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    initial: boolean,
    msg: string,
    closeMsg: string,
}>(), {
    initial: false,
    msg: "Post saved",
    closeMsg: "Close",
});

const isOpen = ref(props.initial)

</script>

<style scoped>
/**
https://dev.to/alvarosabu/create-modals-with-vue3-teleport-tailwindcss-48aj */
</style>