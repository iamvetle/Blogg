<template>
    <div data-test="everything" class="w-full">

        <!-- Doing v-if on the componenents that use the stores included in the v-if - or else error -->

        <div id="top-search">
            <!--
                * Unsure whether I want to do it this way
            -->
            <FeedTopSearch v-if="postStore.posts" />
        </div>

        <div id="top-choice">

            <FeedTopChoice v-if="postStore.posts && postStore.posts?.results" />
        </div>
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

const postStore = usePostStore()

</script>