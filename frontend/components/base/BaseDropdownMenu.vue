<template>
    <div v-if="store.idArrayOfSavedPosts" class="bg-primary rounded-lg text-onPrimary">
        <span class="mb-2 w-full flex items-center text-center justify-center">
            <button
                class="hover:text-primaryFixedDim rounded-md px-1 py-1 text-onPrimary flex text-center items-center justify-center"
                @click="isOpen = !isOpen">
                Toggle dropdown
            </button>
        </span>
        <div v-if="isOpen" id="dropdown-content">
            <slot name="filter">Dropdown items</slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '#imports';

const store = useGeneralStore()

const isOpen = ref(false)

</script>

<style scoped></style>