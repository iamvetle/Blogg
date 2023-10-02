<template>
  <div
    id="postFormWrapper"
    class="mt-10 mb-16"
  >
    <div class="heading text-center font-bold text-2xl m-5 text-gray-800">
      New Post
    </div>
    <div
      class="max-w-3xl py-[100px] mx-auto prose"
    >
      <div id="direct-editor" class="w-full px-[60px] py-[30px] bg-white flex flex-col text-gray-800 border border-gray-300 shadow-lg">
        <EditorCard
          @newPostMaterial="publishPost"
        />
      </div>

      <!-- icons -->
      <div class="icons flex text-gray-500 m-2">
        <!-- <div class="count ml-auto text-gray-400 text-xs font-semibold">
            0/300
          </div> -->
        <!-- Maybe later-->
      </div>
      <!-- buttons -->
      <div class="buttons flex">
        <div v-if="postState">
          <p>Nytt innlegg lagt til!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorCard from '~/components/modules/Editor/EditorCard.vue';

// huske definepagedata senere

const postState = ref(false);

const publishPost = async (request_body : object) => {
  const baseURL = "http://localhost:8888/api/newpost/"
  await createNewPost(baseURL, request_body)
}
</script>

<style scoped></style>
