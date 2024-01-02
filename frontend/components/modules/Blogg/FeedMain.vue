<template>
    <div data-test="everything" class="w-full">

        <div id="top-search">
            <FeedTopSearch/>
        </div>

        <!-- ! Temp disabled - MAKE SEPERATE PAGE LATER -->
        <!-- <div id="top-choice">

            <FeedTopChoice v-if="postStore.posts && postStore.posts?.results" />
        </div> -->
        <div id="posts-list">
            <Suspense>
                <template #default>
                    <FeedPostsList class="w-full mt-12" />
                </template>
                <template #fallback>
                    <span>loading</span>
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * @description Component representing the main feed of the blog.
 */

// const postStore = usePostStore()

</script>