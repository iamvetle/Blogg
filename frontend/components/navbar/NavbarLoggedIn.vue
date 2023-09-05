<template>
  <nav class="border-gray-200 bg-primary-high">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div class="flex items-center">
        <nuxt-link to=""
          ><img src="~/assets/example.png" class="h-8 mr-3" alt="Flowbite Logo"
        /></nuxt-link>
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap text-plain"
          >The Blog</span
        >
      </div>
      <button
        data-collapse-toggle="navbar-solid-bg"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-plain rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-solid-bg"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <ul
          class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent"
        >
          <li>
            <nuxt-link
              to="/"
              class="block py-2 pl-3 pr-4 text-plain rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
              >Hjem</nuxt-link
            >
          </li>

          <li>
            <nuxt-link
              to="/newpost"
              class="block py-2 pl-3 pr-4 text-plain rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
              >New post</nuxt-link
            >
          </li>

          <li>
            <nuxt-link
              to="/"
              class="block py-2 pl-3 pr-4 text-plain rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
              >Følger</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/min-side"
              class="block py-2 pl-3 pr-4 text-plain rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
              >Min side</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/loggut"
              class="block py-2 pl-3 pr-4 text-plain rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-low md:p-0"
              >Logg ut</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { initFlowbite } from "flowbite";
onMounted(initFlowbite);
</script>
