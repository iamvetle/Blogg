<template>
    <div>
        <span>{{ username }}</span>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    username:string;
}>();

</script>

<style scoped>

</style>