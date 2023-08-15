<template>
    <div>
        <div>
            <nuxt-link :to="`/post/${postDetail.id}/`" > {{ postDetail.title }} </nuxt-link> by {{ postDetail.author.username }}
        </div>
        <div class="w-[200px] h-[200px] border">
        {{ postDetail.content }}
        </div>
    </div>
</template>

<script setup>


const { postDetail } = defineProps({
  postDetail: Object
});

console.log(postDetail.id)
</script>