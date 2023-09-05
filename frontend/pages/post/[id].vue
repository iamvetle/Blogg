<template>
  <div class="grid grid-cols-12 py-[100px]">
    <div
      v-if="post"
      class="px-[60px] py-[30px] col-start-5 col-span-4 bg-white"
    >
      <p class="text-3xl py-5">{{ post.title.toUpperCase() }}</p>
      <small>Date here</small>
      <img
        src="~/assets/noimage.jpg"
        alt="idk"
        class="pt-1 rounded-sm h-auto max-w-3/4"
      />
      <p class="pt-3 font-bold">- {{ post.author.username }}</p>
      <p class="py-2">{{ post.content }}</p>
      <button
        @click="$router.go(-1)"
        class="border-2 bg-light-blue-400 rounded-lg py-1 px-2"
      >
        Back
      </button>
    </div>
    <div v-else>
      <p>Did not fetch post, got return '{{ typeof post }}'</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Each individual post (ex: http://localhost:3000/post/3)

interface PostType {
  id: number;
  title: string;
  content: string;
  author: {
    username: string;
    first_name: string;
    last_name: string;
  };
}

const post = ref<PostType | null>(null);

(async () => {
  const route = useRoute();
  const baseURL = `http://localhost:8888/api/post/${route.params.id}/`;

  post.value = await fetchAuthPost(baseURL);
})();
</script>
