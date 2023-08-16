<template>
    <div>
        <div>
            <nuxt-link :to="`/post/${postDetail.id}/`" > {{ postDetail.title }} </nuxt-link> by {{ postDetail.author.username }}
        </div>
        <div class="w-[200px] h-[200px] border">
        {{ postDetail.content }}
        {{ postDetail.id }}
        </div>
    </div>
</template>

<script setup>


const { postDetail } = defineProps(['postDetail']);

console.log(postDetail.id)
</script>