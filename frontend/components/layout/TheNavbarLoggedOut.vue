<!-- <template>
<ElementNavbarLoggedIn v-if="store.isAuthenticated" />
<ElementNavbarLoggedOut v-else />
</template>

<script setup lang="ts">
import { useGeneralStore } from "~/store/generalStore";

const store = useGeneralStore();

checkLocalInfo;
</script>

<style scoped></style> -->

<template>
  <div class="bg-primary-base">
    <div
      id="navbar"
      class="h-16 justify-between flex items-center p-6 md:10/12 sm:w-11/12 w-12/12 mx-auto"
    >
      <div class="flex items-center">
        <h2 class="text-white text-2xl flex ms-8 me-6">
          <nuxt-link to="/">
            Bloggen
          </nuxt-link>
        </h2>
      </div>
      <div
        id="nav-menu"
        class="flex text-center items-center p-6"
      >
        <ul class="flex items-center me-8">
          <li
            id="new-post"
            class="flex items-center me-4"
          >
            <nuxt-link to="/login">
              <p class="text-plain">
                Logg inn
              </p>
            </nuxt-link>
          </li>
          <li
            id="user-account"
            class="flex items-center bg-primary-high hover:bg-primary-600 border-primary-high shadow-md rounded-lg px-3 py-2"
          >
            <nuxt-link to="/register">
              <p class="text-white ">
                Registrer
              </p>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
