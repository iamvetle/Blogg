<template>
    <div id="site-wrapper">
        <h2 class="text-2xl inline">Search results for: <p class="inline pl-2">'{{ store.lastSearch }}'</p></h2>
        <div v-if="store.searchPosts.results">
            <PostWindow v-for="post, index in store.searchPosts.results" :postDetail="post" :key="index"/>
        </div>
        <p v-if="no_posts_found">No results for ''</p>
    </div>


</template>

<script setup lang="ts">
//@ts-nocheck

import { useGeneralStore } from '~/store/generalStore'

// TODO: Install pagnation, and search store posts

const search_input = ref("")
const store = useGeneralStore()

const no_posts_found = ref(false)
const route = useRoute()
const router = useRouter()

</script>

<style scoped>

</style>