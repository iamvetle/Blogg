<template>
    <div>
        <div>{{ postDetail.title }}</div> by {{ postDetail.author.username }}
        <div class="w-[200px] h-[200px] border">
        {{ postDetail.content }}
        </div>
    </div>
</template>

<script setup>

const post = defineProps(["postDetail"])


</script>