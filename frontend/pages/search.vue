<template>
  <div
    id="site-wrapper"
    class="flex flex-col"
  >
    <div>
      <h2 class="text-2xl inline">
        Search results for: <span class="inline pl-2">
          '{{ searchStore.lastSearch }}'
        </span>
      </h2>
      <div v-if="postStore.posts">
        <FeedPostPreviewCard
          v-for="post, index in postStore.posts.results"
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
/**
 * ? @deprecated
 */

import { useSearchStore } from '~/store/searchStore'
import { usePostStore } from '~/store/postStore'

const searchStore = useSearchStore()
const postStore = usePostStore()

const no_posts_found = ref(false)

definePageMeta({
    layout:"default"
})

</script>

<style scoped>

</style>