<template>
    <button :class="[{ 'is-active': isActive }, props.class]" @click="$emit('button-click')">
        <img :class="iconImgClass" :src="icon" :alt="alt">
    </button>
</template>

<script setup lang="ts">

/**
 * ? cant I just remove the span and button as well and just have the plain image?
 */

const props = withDefaults(defineProps<{
    class?: string,
    icon: string,
    alt?: string
    iconImgClass?: string,
    isActive?: string | boolean,
}>(), {
    iconImgClass: "h-5",
})

</script>

<style scoped></style>