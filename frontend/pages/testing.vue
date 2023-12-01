<template>
  <div class="bg-primary rounded-lg p-6">
      <div class="px-5 py-7 bg-onPrimary border-primary border rounded-md">
          <h2 class="text-xl font-bold mb-4">
              Bio
          </h2>
          <div data-test="bio_input_output" id="bio-text" class="break-words">
              <InputTextarea v-model="bioText"/>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

const loggedInUserStore = useLoggedInUserStore()
const bioText = ref("")

onMounted(() => {
  bioText.value = loggedInUserStore.loggedInUserProfile?.bio
})

/**
* Has the bio part of the minkonto page
*/

</script>

<style scoped></style>