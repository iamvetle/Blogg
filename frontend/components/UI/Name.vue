<template>
    <span data-test="name">
        {{ first_name }} {{ last_name }}        
    </span>
</template>

<script setup lang="ts">

defineProps<{
    first_name:string;
    last_name?:string;
}>();

</script>

<style scoped></style>