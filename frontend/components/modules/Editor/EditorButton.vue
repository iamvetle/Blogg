<template>
    <span class="flex">
        <button :class="{ 'is-active': props.isActive }" @click="$emit('button-click')">
            <img :class="props.class" :src="props.icon" :alt="props?.alt">
        </button>
    </span>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    class?:string,
    icon:string,
    alt?:string
    iconImgClass?:string,
    isActive:string,
}>(), {
    class:"h-5 flex items-center"
})

</script>

<style scoped>

</style>