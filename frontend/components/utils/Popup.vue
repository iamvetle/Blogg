<template>
    <div id="root" v-if="isOpen" class="relative">
        <teleport to="#modal-root">
            <div id="modal" class="fixed inset-0 flex items-center justify-center z-50">
                <p>hello there</p>
                <button @click="isOpen = false">Close</button>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">



const props = withDefaults(defineProps<{
    initial:boolean
}>(), {
    initial:false
});


const isOpen = ref(props.initial)

</script>

<style scoped>





</style>