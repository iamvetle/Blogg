<template>
    <div v-bind="$attrs">
        <NumOfFollowing
        :num_of_following="loggedInUserStore.loggedInUserProfile.num_of_following"
        />
    </div>
</template>

<script setup lang="ts">


const loggedInUserStore = useLoggedInUserStore()


</script>


<style scoped>

</style>