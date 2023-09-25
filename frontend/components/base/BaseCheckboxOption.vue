<template>
    <span class="rad flex items-center justify-between">
        <span class="flex items-center">
            <input type="checkbox" name="valg1" id="">
            <span>{{ choice }}</span>
        </span>
        <span>{{ count }}</span>
    </span>
</template>

<script setup lang="ts">

const { choice, count } = defineProps(["choice", "count" ])

</script>

<style scoped></style>