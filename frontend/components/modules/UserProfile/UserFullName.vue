<template>
    <h2 data-test="user-full-name" class="text-4xl leading-[52px] font-medium tracking-[-0.03em]">
        {{ first_name }} {{ last_name }}
    </h2>
</template>

<script setup lang="ts">
/**
 * Is used in the /user/[id] pages to render the full name of the user
 */

defineProps<{
    first_name: string;
    last_name: string;
}>();

</script>

<style scoped></style>