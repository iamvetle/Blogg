<template>
    <div>
        <span class="flex items-center space-x-3">
            <img :src="user_profile_picture" class="flex w-5 h-5">
            <p class="flex"> {{ follower.username }} </p>
        </span>
    </div>
</template>

<script setup lang="ts">
import user_profile_picture from '~/assets/account-circle-line.svg'

const { follower } = defineProps(["follower"])

</script>

<style scoped>

</style>