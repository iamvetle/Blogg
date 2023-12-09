<template>
    <div class="flex flex-col" v-if="loggedInUserStore.loggedInUserProfile">
        <span class="uppercase font-bold tracking-wider mb-2 break-words ">Info</span>
        <ul class="">
            <li v-if="loggedInUserStore.loggedInUserProfile.num_of_saved_posts" class="mb-2 break-words">
                <p class="font bold me-2">
                    Antall lagrede posts:
                    {{ loggedInUserStore.loggedInUserProfile.num_of_saved_posts }}
                </p>
            </li>
            <li v-if="loggedInUserStore.loggedInUserProfile.gender" class="mb-2 break-words">
                <p class="font me-2">
                    <strong>Kjønn:</strong>
                    {{ loggedInUserStore.loggedInUserProfile.gender }}
                </p>
            </li>
            <li v-if="loggedInUserStore.loggedInUserProfile.email" class="mb-2 break-words">
                <p class="font me-2">
                    <strong>Epost:</strong>
                    {{ loggedInUserStore.loggedInUserProfile.email }}
                </p>
            </li>
            <li v-if="loggedInUserStore.loggedInUserProfile.phone_number" class="mb-2 break-words">
                <p class="font me-2">
                    <strong>Tlf:</strong>
                    {{ loggedInUserStore.loggedInUserProfile.phone_number }}
                </p>
            </li>
            <li v-if="loggedInUserStore.loggedInUserProfile.address" class="mb-2 break-words">
                <p class="font me-2">
                    <strong>Adresse:</strong>
                    {{ loggedInUserStore.loggedInUserProfile.address }}
                </p>
            </li>
            <li v-if="loggedInUserStore.loggedInUserProfile.date_of_birth" class="mb-2 break-words">
                <p class="me-2">
                    <strong>Fødselsdato:</strong>
                    {{ loggedInUserStore.loggedInUserProfile.date_of_birth }}
                </p>
            </li>
            <hr>
            <li v-if="loggedInUserStore.loggedInUserProfile.date_joined" class="mb-2 break-words">
                <p class=" text-sm font me-2">
                    Datoen du ble med i Bloggen:
                    {{ loggedInUserStore.loggedInUserProfile.date_joined }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

/**
 * Lists the basic information about the user in the sidebar at the 'minkonto' page
 */

const loggedInUserStore = useLoggedInUserStore()

</script>

<style scoped></style>