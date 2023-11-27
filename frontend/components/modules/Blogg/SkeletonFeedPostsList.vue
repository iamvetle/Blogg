<template>
    <div v-for="i in skeletonArticles">
        <feed-post-preview-card :key="i">
            <template #profile_picture>
                <v-skeleton-loader type="avatar">
                    
                </v-skeleton-loader>
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
                <v-skeleton-loader type="heading">
                    
                </v-skeleton-loader>

            </template>
            <template #content>
                <v-skeleton-loader type="paragraph">
                    
                </v-skeleton-loader>
                
            </template>
            <template #lesmer>
                <!-- <v-skeleton-loader type="text">
                    
                </v-skeleton-loader> -->
            </template>
            <template #article_image>
                <v-skeleton-loader type="image" class="w-full h-auto">
                    
                </v-skeleton-loader>
            </template>
        </feed-post-preview-card>   
    </div>
</template>

<script setup lang="ts">

const skeletonArticles = 10

</script>

    <style scoped></style>