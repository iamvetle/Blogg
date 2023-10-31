<template>
  <section class="bg-surface" v-if="generalStore.isAuthenticated == false">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-surfaceContainerLowest border-surfaceContainerLowest border rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div id="login_form">
            <LoginCard :redirect="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import { useGeneralStore } from '~/store/generalStore';

definePageMeta({
  layout:"form-layout"
})

const generalStore = useGeneralStore()

</script>

<style scoped></style>
