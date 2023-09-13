<template>
  <div id="wrapper">
    <section class="bg-plain dark:bg-gray-900" v-if="store.posts">
      <p></p>
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2
            class="pt-10 mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            Siste blogginnlegg
          </h2>
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Her er de siste blogginnleggene.
          </p>
        </div>
        <div id="main" class="py-12 grid gap-8 lg:grid-cols-2" v-if="store.posts.results">
          <PostWindow v-for="post in store.posts.results" :key="post.id" :postDetail="post" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const store = useGeneralStore()

onBeforeMount( async() => {
  await fetchPostSnippets()
  console.log(store.posts)
})
</script>

<style scoped lang="scss"></style>
