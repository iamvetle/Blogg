<template>
    <span class="flex">
        <button :class="{ 'is-active': isActive }" @click="$emit('button-click')">
            <img :class="class" :src="icon" :alt="alt">
        </button>
    </span>
</template>

<script setup lang="ts">

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