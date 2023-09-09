<template>
    <div>
        - {{ follower.username }}
    </div>
</template>

<script setup lang="ts">

const { follower } = defineProps(["follower"])

</script>

<style scoped>

</style>