<template>
  <div id="wrapper">
    <section class="bg-plain dark:bg-gray-900" v-if="posts">
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
        <div id="main" class="py-12 grid gap-8 lg:grid-cols-2" v-if="posts">
          <PostWindow v-if="posts" v-for="post in posts.results" :key="post.id" :postDetail="post" />
        </div>
      </div>
    </section>
    <div v-else>
      <p>There are no posts. Return value from fetch is {{ typeof posts }}</p>
      <!-- print to self -->
    </div>
  </div>
</template>

<script setup lang="ts">

const posts = ref<SnippetPostType | null>(null);

onMounted(async () => {
  const baseURL = "http://localhost:8888/api/feed/";
  posts.value = await fetchAllPosts(baseURL) as SnippetPostType;
  posts.value?.reverse()
})
</script>

<style scoped lang="scss"></style>
