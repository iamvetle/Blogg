<template>
    <div>
        <img :src="src" v-bind="$attrs"/>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    src:string;
}>();

</script>

<style scoped>

</style>