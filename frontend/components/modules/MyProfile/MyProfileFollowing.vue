<template>
    <div>
        <Following v-bind="$attrs" v-for="(username, index) in arrayOfUsersThatMyUserIsFollowing" :key="index" :following="username" />
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

defineOptions({
    inheritAttrs:false
})

const loggedInUserStore = useLoggedInUserStore()

const arrayOfUsersThatMyUserIsFollowing = computed(() => loggedInUserStore.idArrayOfLoggedInUserFollowingUsers)

</script>

<style scoped></style>