<template>
    <div v-bind="$attrs">
        <NumOfFollowing
        :num_of_following="loggedInUserStore.loggedInUserProfile.num_of_following"
        />
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore'

const loggedInUserStore = useLoggedInUserStore()


</script>


<style scoped>

</style>