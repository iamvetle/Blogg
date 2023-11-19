<template>
    <div>
        <Following :class="forEachClass" v-for="(username, index) in arrayOfUsersThatMyUserIsFollowing" :key="index" :username="username" />
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

defineProps<{
    forEachClass?:string
}>();

const loggedInUserStore = useLoggedInUserStore()

const arrayOfUsersThatMyUserIsFollowing = computed(() => loggedInUserStore.idArrayOfLoggedInUserFollowingUsers)

</script>

<style scoped></style>