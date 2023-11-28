<template>
    <div data-test="html-content" v-bind="$attrs" v-html="html"></div>
</template>

<script setup lang="ts">
/**
 * Renders the prop element - which is supposed to be 
 * html content as one big string
 */
defineProps<{
    html: string;
}>();

</script>

<style scoped></style>