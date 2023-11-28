<template>
    <div id="aside" class="h-auto w-full mb-14">

        <div data-test="myprofile" class="w-full">

            <logged-in-user-profile-card class="bg-white shadow-lg">

                <template #profile_picture>
 
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

                </template>

                <!-- <template #amount-of-saved-posts>
                    <v-skeleton-loader type="text" class="w-24">
                </v-skeleton-loader>
                </template> -->
            </logged-in-user-profile-card>
        </div>

        <hr class="mb-8">

        <div id="saved-posts" class="w-full mb-8">


            <div id="saved_articles">
                <!--
                    TODO Add skeleton load for this later
                
                <PostSavedCardList />
                -->

            </div>
        </div>

        <hr class="mb-8">

        <div id="following-card" class="mx-auto w-full">

            <div>

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