<template>
	<div class="py-1" v-if="store.allTags">
		<div class="py-1 ml-2" v-for="(category, index) in store.allTags.results">
			<BaseCheckboxOption :key="index" v-model="selectedCategories[category.name]" :label="category.name" />
		</div>		
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

/** 
 * The component is a base for filtering. It has input fields that can be 
 * customized. The component is susposed to be associated to a fetch function, or similar.
 * 
 * The component is NOT finished. An unfinished idea!  
 * 
 */

const baseGroundURL = "http://localhost:8888/api/feed/"
const setupTagURL = `${baseGroundURL}?`

const selectedCategories = ref<any>({})

const store = useGeneralStore()

const selectedCategoryNames = computed(() => {
	return Object.keys(selectedCategories.value).filter(key => selectedCategories.value[key]);
});

/**
 * The computed function returns the custom url I would use in my api data fetch 
 * call for tag filtering
 * 
 * @returns - custom url ready for GET fetch   
 */
const customURL = computed(() => {
	let url = setupTagURL

	for (let category of selectedCategoryNames.value) {
		url += `categories=${category}&`
	}
	if (url != setupTagURL) {
		return url.slice(0, -1)
	} else {
		return baseGroundURL
	}
})


/**
 * Fetches new posts automatically based on the customURL
 */
	watchEffect(async () => {
		await getPostMultipleSnippet(customURL.value) // maybe I should please <- this one longer up?
	})

</script>

<style scoped></style>
