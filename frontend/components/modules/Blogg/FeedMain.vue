<template>
    <div data-test="everything" class="col-span-6 mx-auto w-full">

        <!-- Doing v-if on the componenents that use the stores included in the v-if - or else error -->

        <div id="top-search" >
            <FeedTopSearch v-if="postStore.posts && loggedInUserStore.loggedInUserProfile"/>
        </div>

        <div id="top-choice" >
            <FeedTopChoice v-if="postStore.posts"/>
        </div>
        <!-- I need to do this v-if statement because of when I am using following i dont what this here I think (strictly speaking not necesarry to use v-if) -->
        <div id="posts-list" v-if="postStore.posts?.results">
            <FeedPostsList class="w-full mt-12" />
        </div>
        <div v-else>
            <SkeletonFeedPostsList/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

const loggedInUserStore = useLoggedInUserStore()
const postStore = usePostStore()

</script>