<template>
  <div id="site-wrapper">
    <div class="w-9/12 mx-auto border-v pb-[60px]">
      <div class="w-full px-[80px] grid grid-cols-12 gap-[80px]">
        <div class="inline-block col-span-8 border-v border-blue-500">
          <!-- 8/12 main content-->

          <img
            src="~/assets/noimage.jpg"
            id="header"
            class="h-[150px] w-full object-cover border-v border-slate-500"
          />
          <!-- The IMAGE -->

          <div id="top" class="px-2 pt-[50px]">
            <div id="heading" class="prose">
              <h2
                class="text-4xl leading-[52px] font-medium tracking-[-0.03em]"
              >
                {{ posts[0].first_name }} {{ posts[0].last_name }}
              </h2>
            </div>

            <div class="pt-[30px]">
              <ul class="flex justify-start items-center space-x-4">
                <li class="prose">Home</li>
                <li class="prose">Links</li>
                <li class="prose">About</li>
              </ul>
            </div>
            <hr class="mt-2" />
          </div>
          <div id="main" class="pt-[50px]">
            <div class="pb-[40px]">
              <PostArticle
                v-for="post in posts"
                :key="post.id"
                :postProp="post"
              />
            </div>
          </div>
        </div>

        <div id="sidebar" class="px-5 col-span-4 border-v border-red-500">
          <UserSidebar v-if="posts != null" :sideBarProp="posts[0]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck

interface PostType {
  id: number;
  title: string;
  content_snippet: string;
  date_published: string;
  last_modified: string;
  author: {
    username: string;
    first_name: string;
    last_name: string;
  };
}

const posts = ref<PostType[]>([]);
const userProp = ref(null);

await(async () => {
  const route = useRoute();
  const baseURL = `http://localhost:8888/api/${route.params.id}/`;

  //@ts-ignore
  posts.value = await fetchAuthPosts(baseURL);
  console.dir(toRaw(posts.value[0].posts))
  posts.value = posts.value[0].posts
  console.log(posts.value)
  userProp.value = posts.value[0];

  for (let i in posts.value) {
    console.log(i)
  }
})();
</script>

<style scoped></style>
