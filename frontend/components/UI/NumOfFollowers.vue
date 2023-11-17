<template>
    <div v-bind="$attrs" data-test="numm_of_followers">
        <span v-if="num_of_followers === 1">{{ num_of_followers }} follower</span>
        <span v-else>{{ num_of_followers }} followers</span>
    </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    num_of_followers?:number
}>(), {
    num_of_followers:0
});

</script>

<style scoped>

</style>