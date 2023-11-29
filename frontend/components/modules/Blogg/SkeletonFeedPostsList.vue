<template>
    <div v-for="i in skeletonArticles">
        <feed-post-preview-card :key="i">
            <template #profile_picture>

            </template>
            <template #author>
                <!-- <v-skeleton-loader type="text" class="w-fit">
                    
                </v-skeleton-loader> -->
            </template>
            <template #date_published>
                <!-- <v-skeleton-loader type="heading">
                    
                </v-skeleton-loader> -->
    
            </template>
            <template #title>


            </template>
            <template #content>

                
            </template>
            <template #lesmer>
                <!-- <v-skeleton-loader type="text">
                    
                </v-skeleton-loader> -->
            </template>
            <template #article_image>

            </template>
        </feed-post-preview-card>   
    </div>
</template>

<script setup lang="ts">

const skeletonArticles = 10

</script>

    <style scoped></style>