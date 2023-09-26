<template>
  <div id="searchbar-wrapper">
    <input
      v-model="search_input"
      type="text"
      class="border-plain shadow-sm rounded-md h-10 md:max-w-[250px] max-w-[175px] hidden items-center sm:flex"
      placeholder="Søk.."
      @keyup.enter="trySearch"
    >
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/store/searchStore'
const store = useSearchStore()
const search_input = ref("")

const trySearch = async () => {
	store.lastSearch = search_input.value

	if ( search_input.value.trim() != "" ) {

		store.baseSearchURL = `http://localhost:8888/api/search/?q=${search_input.value}`
		
		await searchRequest()
		console.log(search_input.value)
		search_input.value = ""

		return await navigateTo(`/search?q=${search_input.value}`)
	}
}
</script>

<style scoped></style>