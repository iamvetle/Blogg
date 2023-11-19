<template>
    <div data-test="everything" class="col-span-6 mx-auto w-full">

        <div id="top-search">
            <FeedTopSearch />
        </div>

        <div id="top-choice">
            <FeedTopChoice />
        </div>
        <!-- I need to do this v-if statement because of when I am using following i dont what this here I think (strictly speaking not necesarry to use v-if) -->
        <div id="posts-list" v-if="postStore.posts.results">
            <FeedPostsList class="w-full mt-12" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/postStore';

const postStore = usePostStore()

</script>