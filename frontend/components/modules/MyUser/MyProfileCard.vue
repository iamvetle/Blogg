<template>
    <div id="personal-user-card" class="mx-auto mb-8 px-8 py-4 rounded-lg text-onSecondaryContainer bg-secondaryContainer shadow-md">
        <div class="mb-4 w-full flex items-center text-onPrimaryContainer">
            <img :src="userProp.avatar" class="w-20 h-auto text-onPrimaryContainer">
            <div class="ml-2">
                <h2 id="card-username" class=" text-4xl text-onPrimaryContainer">{{ userProp.username }}</h2>
                <span>

                    <p id="card-name" class="text-onPrimaryContainer">{{ full_name }}</p>
                </span>
            </div>
        </div>
        <p class="text-onPrimaryContainer">Antall følgere: 10</p>
        <p class="text-onPrimaryContainer">Antall innlegg: 14</p>
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