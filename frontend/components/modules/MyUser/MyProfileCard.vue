<template>
    <div id="personal-user-card" class="mx-auto mb-8 px-8 py-4 rounded-lg text-onSecondaryContainer bg-secondaryContainer shadow-md w-full">
        <div class="mb-4 w-full flex flex-wrap min-w-0 items-center text-onPrimaryContainer">
            <img :src="userProp.avatar" class="w-20 h-auto text-onPrimaryContainer mr-2">
            <div class="min-w-0">
                <h2 id="card-username" class="text-4xl text-onPrimaryContainer whitespace-normal break-words">{{ userProp.username }}</h2>
                <span>
                    <p id="card-name" class="text-onPrimaryContainer ">{{ full_name }}</p>
                </span>
            </div>
        </div>
        <p class="text-onPrimaryContainer">Antall følgere: X</p>
        <p class="text-onPrimaryContainer">Antall innlegg: X</p>
    </div>
</template>

<script setup lang="ts">
//import profile_picture from '~/assets/account-circle-line.svg'

const { userProp } = defineProps(["userProp"])

const full_name = computed(() => {
    return userProp.first_name + " " + userProp.last_name
})

</script>

<style scoped></style>