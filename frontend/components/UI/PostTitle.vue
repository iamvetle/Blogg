<template>
    <div>
        <span>
            <h1 data-test="title" v-bind="$attrs">{{ title }}</h1>
        </span>
    </div>
</template>

<script setup lang="ts">
/**
 * Displays the text prop
 */

defineProps<{
    title: string;
}>();

</script>

<style scoped></style>