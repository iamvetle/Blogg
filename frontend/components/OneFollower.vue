<template>
    <div>
        <span class="flex items-center space-x-3">
            <img :src="profile_picture" class="flex w-5 h-5">
            <p class="flex"> {{ follower.username }} </p>
        </span>
    </div>
</template>

<script setup lang="ts">
import profile_picture from '~/assets/no.png'
import three_dots from '~/assets/three-dots.svg'

const { follower } = defineProps(["follower"])

</script>

<style scoped>

</style>