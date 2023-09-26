<template>
  <div
    id="site-wrapper"
    class="bg-background text-onBackground"
  >
    <div
      id="main"
      class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28"
    >
      <div
        v-if="(store.posts) && (store.posts.results)"
        id="content"
        class="col-span-6 mx-auto"
      >
        <div

        >
          <ArticleCardd
          v-for="post in store.posts.results"
          :key="post.id"
          class="article"
            :postProp="post" 
          />
          <hr class="mb-16">
        </div>
      </div>

      <div
        id="aside"
        class="col-span-4 h-auto w-full mb-14 mx-auto"
      >
        <div
          v-if="userdata"
          id="my-profile-card"
          class="w-full"
        >
          <MyProfileCard
            :user-prop="userdata"
          />
        </div>

        <hr class="mb-8">

        <div
          id="saved-posts"
          class="mx-auto w-full mb-8"
        >
          <h3 class=" text-[28px] mb-9">
            Lagrede innlegg
          </h3>

          <div class="saved-article">
            <ArticleSavedCard />
          </div>
          <p class="-mt-2 text-xs text-primary hover:text-primaryFixed">
            Se alle
          </p>
        </div>

        <hr class="mb-8">

        <div
          id="following-card"
          class="mx-auto w-full"
        >
          <h3 class="text-[28px] mb-9">
            Følger
          </h3>
          <div id="following">
            <Following />
          </div>
          <span class="text-xs text-primary hover:text-primaryFixed">Se alle</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const store = useGeneralStore()
const userdata = ref<null | PersonalUserType>(null)

onBeforeMount(async () => {
  await fetchPostSnippets()
  console.log(store.posts)
})

onMounted(async () => {
  const baseMyUserURL = "http://localhost:8888/api/min-side/" 
  userdata.value = await fetchPersonalUser(baseMyUserURL)
  console.log(userdata.value.data) // print to self
})


</script>

<style scoped></style>
