<template>
    <div data-test="everything" class="w-full">

        <!-- Doing v-if on the componenents that use the stores included in the v-if - or else error -->

        <div id="top-search">
            <!--
                * Unsure whether I want to do it this way
            -->
            <FeedTopSearch v-if="isReadyTopSearch" />
        </div>

        <div id="top-choice">

            <FeedTopChoice v-if="isReadyTopChoice" />
        </div>
        <div id="posts-list">
            <!-- ? no v-if here?
            ? because I want skeleton loader I think? - but not suspense then? 
            ? -->
            <FeedPostsList class="w-full mt-12" />
        </div>
        <!-- <div v-else>
            <SkeletonFeedPostsList />
        </div> -->
    </div>
</template>

<script setup lang="ts">

const postStore = usePostStore()
const searchStore = useSearchStore()

const isReadyTopSearch = computed(() => searchStore.searchPart)
const isReadyTopChoice = computed(() => postStore.posts?.results)


</script>