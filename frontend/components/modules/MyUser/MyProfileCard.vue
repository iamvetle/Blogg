<template>
    <div id="personal-user-card" class="mx-auto mb-8">
        <div class="mb-4 w-full flex items-center ">
            <img :src="profile_picture" class="w-20 h-auto">
            <div class="ml-2">
                <h2 id="card-username" class=" text-4xl">Brukernavn</h2>
                <span>

                    <p id="card-name" class="prose">Ola Nordmann</p>
                </span>
            </div>
        </div>
        <p>Antall følgere: 10</p>
        <p>Antall innlegg: 14</p>
    </div>
</template>

<script setup lang="ts">
import profile_picture from '~/assets/placeholder-profile-picture.png'

</script>

<style scoped></style>