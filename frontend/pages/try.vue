<template>
  <div
    id="site-wrapper"
    class="bg-background text-onBackground"
  >
    <TheNavbarr />

    <div
      id="main"
      class="max-w-[1100px] h-fit mx-auto px-6 grid grid-cols-10 gap-28"
    >
      <div
        v-if="(posts) && (posts.posts)"
        id="content"
        class="col-span-6 mx-auto"
      >
        <div
          v-for="post, index in posts.posts"
          :key="index"
          class="article"
        >
          <ArticleCard
            :post-prop="post" 
          />
          <hr class="mb-16">
        </div>
      </div>

      <div
        id="aside"
        class="col-span-4 h-auto w-full mb-14 mx-auto"
      >
        <div
          v-if="user"
          id="my-profile-card"
          class="w-full"
        >
          <MyProfileCard
            :user-prop="user"
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

import axios from 'axios'
import { RandomAccount, FakePost } from '~/typescript/interfaces'

// import article_image from '~/assets/placeholder-image.jpg'

const user = ref<null | RandomAccount>(null)
const posts = ref<null | FakePost>(null)

// From api
const fetchUser = async()=> {
	const url = "https://random-data-api.com/api/v2/users?size=1"
	const response = await axios.get(url)
	console.log(response.data)
	user.value = response.data
}
onMounted(fetchUser)

const fetchPosts = async () => {
	const url = "https://dummyjson.com/posts?skip=5&limit=10";
	const response = await axios.get(url)
	console.log(response.data) // print to self
	posts.value = response.data
}
onMounted(fetchPosts)


definePageMeta({
	layout: "blank"
})

</script>

<style scoped></style>