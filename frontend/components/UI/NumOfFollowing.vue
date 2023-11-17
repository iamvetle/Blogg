<template>
    <div v-bind="$attrs" data-test="num_of_following">
        <span>{{ num_of_following }} following</span>
    </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    num_of_following?:number
}>(), {
    num_of_following:0
});

</script>

<style scoped>

</style>