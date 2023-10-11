<template>
    <div>
        <button @click="toggleDropdown">Toggle dropdown</button>
        <div v-if="isOpen" id="dropdown-content">
        </div>
    </div>
</template>

<script setup lang="ts">

const isOpen = ref(false)

const toggleDropdown = () => {
    isOpen.value != isOpen.value
}

</script>

<style scoped>

</style>