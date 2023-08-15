<template>
    <div>
        <button>Back</button>
        <h2 class="text-3xl">{{ post.title }}</h2>
        <p>{{ post.content }}</p>
    </div>
</template>

<script setup>
const prop = defineProps(["post"])
</script>