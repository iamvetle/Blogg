<template>
  <div
    id="site-wrapper"
    class="flex flex-col"
  >
    <div>
      <h2 class="text-2xl inline">
        Search results for: <span class="inline pl-2">
          '{{ store.lastSearch }}'
        </span>
      </h2>
      <div v-if="store.searchPosts">
        <ArticleCard
          v-for="post, index in store.searchPosts.results"
          :key="index"
          :post-detail="post"
        />
      </div>
    </div>
    <p v-if="no_posts_found">
      No results for ''
    </p>
  </div>
</template>

<script setup lang="ts">

import { useSearchStore } from '~/store/searchStore'

const store = useSearchStore()

const no_posts_found = ref(false)

definePageMeta({
    layout:"search-layout"
})

</script>

<style scoped>

</style>