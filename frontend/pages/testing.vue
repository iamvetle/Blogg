<template>
  <div class="bg-primary rounded-lg p-6">
      <div class="px-5 py-7 bg-onPrimary border-primary border rounded-md">
          <h2 class="text-xl font-bold mb-4">
              Bio
          </h2>
          <div data-test="bio_input_output" id="bio-text" class="break-words">
              <InputText v-model="bioText"
              class="not-prose appearance-none ring-0 border-none resize-none w-full text-4xl leading-4 font-extrabold outline-none" />

              />
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">

const bioText = ref("")


/**
* Has the bio part of the minkonto page
*/

</script>

<style scoped></style>