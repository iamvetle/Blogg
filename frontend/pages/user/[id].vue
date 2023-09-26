<template>
  <div id="site-wrapper">
    <div class="w-9/12 mx-auto border-v pb-[60px]">
      <div class="w-full px-[80px] grid grid-cols-12 gap-[80px]">
        <div class="inline-block col-span-8 border-v border-blue-500">
          <!-- 8/12 main content-->

          <img
            id="header"
            :src="placeholder_header_image"
            class="h-[150px] w-full object-cover border-v border-slate-500"
          >
          <!-- The IMAGE -->

          <div
            id="top"
            class="px-2 pt-[50px]"
          >
            <div
              id="heading"
              class="prose"
            >
              <h2
                class="text-4xl leading-[52px] font-medium tracking-[-0.03em]"
              >
                {{ first_name }} {{ last_name }}
              </h2>
            </div>

            <div class="pt-[30px]">
              <ul class="flex justify-start items-center space-x-4">
                <li class="prose">
                  Home
                </li>
                <li class="prose">
                  Links
                </li>
                <li class="prose">
                  About
                </li>
              </ul>
            </div>
            <hr class="mt-2">
          </div>
          <div
            id="main"
            class="pt-[50px]"
          >
            <div
              v-if="store.theUser[0].posts"
              class="pb-[40px]"
            >
              <ArticleEntire
                v-for="post in store.theUser[0].posts"
                :key="post.id"
                :post-prop="post"
                class="mt-10"
              />
            </div>
          </div>
        </div>

        <div
          id="sidebar"
          class="px-5 col-span-4 border-v border-red-500"
        >
          <TheSidebar
            v-if="store.theUser[0].posts != null"
            :side-bar-prop="userProp"
            :num_of_followers="followers"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// a user's page
//@ts-nocheck

import placeholder_header_image from '~/assets/placeholder-image.jpg'
import ArticleEntire from '~/components/modules/Blogg/ArticleEntire.vue';
import TheSidebar from '~/components/modules/UserProfile/TheSidebar.vue';
import { useGeneralStore } from '~/store/generalStore';

const store = useGeneralStore()

const userProp = ref(null);
const first_name = ref(null);
const last_name = ref(null);
const followers = ref(null)
const username = ref(null)

await(async () => {
  const route = useRoute();
  const theUserURL = `http://localhost:8888/api/${route.params.id}/`;

  //@ts-ignore
  await fetchUserInfoPosts(theUserURL);
  console.dir(toRaw(store.theUser[0]))

  followers.value = store.theUser[0].posts[0].num_of_followers;
  console.log(toRaw(followers.value))

  console.log(toRaw(store.theUser[0].posts))
  console.log(toRaw(store.theUser[0].posts[0].author.first_name))
  //

  //
  first_name.value = store.theUser[0].posts[0].author.first_name
  last_name.value = store.theUser[0].posts[0].author.last_name
  username.value = store.theUser[0].posts[0].author.username

  userProp.value = username.value;

  } )();
</script>

<style scoped></style>
