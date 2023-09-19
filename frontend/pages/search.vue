<template>
    <div id="site-wrapper">
        <h2 class="text-2xl inline">Search results for: <p class="inline pl-2">'{{ store.lastSearch }}'</p></h2>
        <div v-if="store.searchPosts">
            <PostWindow v-for="post, index in store.searchPosts.results" :postDetail="post" :key="index"/>
            <SearchPagination/>
        </div>
        <div>
            
        </div>
        <p v-if="no_posts_found">No results for ''</p>
    </div>


</template>

<script setup lang="ts">

// jeg må rewrite hele pagnation vis jeg vil ha det med search også

import { useSearchStore } from '~/store/searchStore';

// TODO: Install pagnation, and search store posts

const store = useSearchStore()

const no_posts_found = ref(false)

</script>

<style scoped>

</style>