<template>
  <div class="grid grid-cols-12 py-[100px]">
    <div
      v-if="post"
      class="px-[60px] py-[30px] col-start-5 col-span-4 bg-white"
    >
      <p class="text-3xl py-5 prose">{{ post.title.toUpperCase() }}</p>
      <small class="prose">Published {{ post.date_published }}</small>
      <img
        :src="noimage"
        alt="idk"
        class="pt-1 rounded-sm h-auto max-w-3/4"
      />
      <p class="pt-3 font-bold prose">- {{ post.author.username }}</p>
      <div class="py-2 prose" v-html="post.content"></div>
      <button
        @click="$router.go(-1)"
        class="border-2 bg-light-blue-400 rounded-lg py-1 px-2"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import noimage from '~/assets/noimage.jpg'

const post = ref<SinglePostType | null>(null);

onMounted( async () => {
  const route = useRoute();
  const postURL = `http://localhost:8888/api/post/${route.params.id}/`;

  post.value = await fetchPost(postURL);
});

</script>
