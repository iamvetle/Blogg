<template>
    <div>
        <h1 v-bind="$attrs">
            {{ first_name }} {{ last_name }}
        </h1>
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

const loggedInUserStore = useLoggedInUserStore()

const first_name = computed(() => loggedInUserStore.loggedInUserProfile.first_name)
const last_name = computed(() => loggedInUserStore.loggedInUserProfile.last_name)


</script>

<style scoped></style>