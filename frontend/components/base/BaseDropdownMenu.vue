<template>
    <div>
        <button class="p-1 bg-primary text-onPrimary" @click="isOpen = !isOpen">Toggle dropdown</button>
        <div v-if="isOpen" id="dropdown-content">
            <slot name="filter">

            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">

const isOpen = ref(false)

// const toggleDropdown = () => {
//     isOpen.value != isOpen.value
// }

</script>

<style scoped>

</style>