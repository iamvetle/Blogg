<template>
    <div>
        <p>{{ $route.params.id }}</p>
    </div>
</template>

<script setup lang="ts">
const postId = useRoute()

const { data } = await useAsyncData('feed', () => $fetch(`http://localhost:8888/api/post/${postId.params.id}`)) // fix error code later
</script>