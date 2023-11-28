<template>
    <div>
        <span v-for="username in arrayOfUsersThatMyUserIsFollowing" >
            <Following v-bind="$attrs" :key="username" :following="username" />
        </span>
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