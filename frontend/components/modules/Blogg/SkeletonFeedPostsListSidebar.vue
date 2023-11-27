<template>
    <div id="aside" class="h-auto w-full mb-14">

        <div data-test="myprofile" class="w-full">

            <logged-in-user-profile-card class="bg-white shadow-lg">

                <template #profile_picture>
                    <v-skeleton-loader type="list-item-avatar-two-line" class="w-full">

                    </v-skeleton-loader>
                </template>

                <!-- <template #username >
                    <v-skeleton-loader type="" class="w-full h-auto">
                    </v-skeleton-loader>
                </template> -->
                <!-- 
                <template #full-name >
                    <v-skeleton-loader type="text" class="w-full">
                    </v-skeleton-loader>

                </template> -->

                <template #amount-of-followers>
                    <v-skeleton-loader type="text, text" class="w-24">
                    </v-skeleton-loader>
                </template>

                <!-- <template #amount-of-saved-posts>
                    <v-skeleton-loader type="text" class="w-24">
                </v-skeleton-loader>
                </template> -->
            </logged-in-user-profile-card>
        </div>

        <hr class="mb-8">

        <div id="saved-posts" class="w-full mb-8">
            <v-skeleton-loader type="heading" class="w-44">

            </v-skeleton-loader>

            <div id="saved_articles">
                <!--
                    TODO Add skeleton load for this later
                
                <PostSavedCardList />
                -->
                <v-skeleton-loader type="text" class="w-60">

                </v-skeleton-loader>
            </div>
        </div>

        <hr class="mb-8">

        <div id="following-card" class="mx-auto w-full">

            <div>
                <v-skeleton-loader type="heading" class="w-64">
                </v-skeleton-loader>
                <div v-for="i of count">
                    <span :key="i">
                        <SkeletonFollowing />
                    </span>
                </div>

            </div>

            <div>
                <!-- <h3>Du følger ingen</h3> -->
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">

const count = [
    "one",
    "two",
    "three"
]

</script>

<style scoped></style>