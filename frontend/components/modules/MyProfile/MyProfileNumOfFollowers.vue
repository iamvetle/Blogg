<template>
    <div v-bind="$attrs">
        <NumOfFollowers
        :num_of_followers="loggedInUserStore.loggedInUserProfile.num_of_followers"
        />
    </div>
</template>

<script setup lang="ts">


const loggedInUserStore = useLoggedInUserStore()


</script>


<style scoped>

</style>