<template>
  <div id="postFormWrapper" class="mt-10 mb-16">
    <div class="heading text-center font-bold text-2xl m-5 text-gray-800">
      New Post
    </div>
      <div
        class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <div>
          <EditorCard
          @newPostMaterial ="publishPost"
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
