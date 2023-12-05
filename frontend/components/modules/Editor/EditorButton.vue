<template>
    <span class="flex">
        <button :class="{ 'is-active': isActive }" @click="$emit('button-click')">
            <img :class="class" :src="icon" :alt="alt">
        </button>
    </span>
</template>

<script setup lang="ts">

/**
 * ? cant I just remove the span and button as well and just have the plain image?
 */

withDefaults(defineProps<{
    class?:string,
    icon:string,
    alt?:string
    iconImgClass?:string,
    isActive?:string | boolean,
}>(), {
    class:"h-5 flex items-center",
})

</script>

<style scoped>

</style>