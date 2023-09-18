<template>
	<div id="navbar-wrapper" class="items-center">
	<nav class="border-gray-200 bg-primary-high items-center">
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<span class="ps-7 self-center text-2xl font-semibold whitespace-nowrap text-plain">
			<nuxt-link to="/">The Blog</nuxt-link>
		</span>
		<div class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-search">
			<div id="nav-menu" class="flex items-center">
        <ul
        class="flex font-medium mt-4 rounded-lg bg-gray-50 md:flex-row lg:space-x-6 md:space-x-4 md:mt-0 md:bg-transparent items-center"
                    >
                    <li class="h-10 flex text-plain  hover:text-secondary-low border-plain border-2 p-1 rounded-md items-center hover:border-secondary-base">
          <nuxt-link
          to="/login"
          class="flex items-center text-plain py-2 pl-3 pr-4 rounded md:p-0"
          >Login</nuxt-link
          >
        </li>
        <li class="flex shadow-md h-10 p-1 rounded-md items-center bg-secondary-base hover:bg-secondary-low">
          <nuxt-link
          to="/registrer"
          class="flex items-center py-2 pl-3 pr-4 text-plain md:hover:bg-transparent md:p-0"
          >Registrer</nuxt-link
          >
        </li>
        </ul>
      </div>
		</div>
		</div>
	</nav>
	</div>
</template>

<script setup lang="ts">
import example from "~/assets/example.png"

const image = example

</script>
