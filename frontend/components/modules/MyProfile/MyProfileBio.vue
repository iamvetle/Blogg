<template>
    <div v-if="loggedInUserStore.loggedInUserProfile" class="bg-primary rounded-lg p-6">
        <div class="px-5 py-7 bg-onPrimary border-primary border rounded-md">
            <h2 class="text-xl font-bold mb-4">
                Bio
            </h2>
            <div id="bio-text" class="break-words">
                <p v-if="loggedInUserStore.loggedInUserProfile.bio" v-text="loggedInUserStore.loggedInUserProfile.bio"></p>
                <p v-else>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit. Nunc
                    finibus vel ante id euismod. Vestibulum ante ipsum primis in
                    faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
                    erat volutpat. Nulla vulputate pharetra tellus, in luctus risus
                    rhoncus id.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

const loggedInUserStore = useLoggedInUserStore()

/**
 * Has the bio part of the minkonto page
 */

</script>

<style scoped></style>