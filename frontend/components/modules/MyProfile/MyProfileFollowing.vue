<template>
    <div v-bind="$attrs">
        <Following :class="forEachClass" v-for="(username, index) in arrayOfUsersThatMyUserIsFollowing" :key="index" :username="username" />
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

defineProps<{
    forEachClass?:string
}>();

const loggedInUserStore = useLoggedInUserStore()

const arrayOfUsersThatMyUserIsFollowing = computed(() => loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.length != 1 ? loggedInUserStore.idArrayOfLoggedInUserFollowingUsers : "0" )

</script>

<style scoped></style>