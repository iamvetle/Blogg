<template>
	<div>
		<div v-for="category in categories" :key="category.name">
			<BaseCheckboxOption v-model="selectedCategories[category.name]" :label="category.name" />
		</div>

		<div>
			Selected Categories: {{ selectedCategories }}
			{{ categories }}
		</div>
	</div>
</template>

<script setup>
/** The component is a base for filtering. It has input fields that can be 
 * customized. The component is susposed to be associated to a fetch function, or similar.
 * 
 * The component is NOT finished. An unfinished idea!  
 * */

import axios from 'axios'

const categories = ref(null)

onMounted(async () => {
	const response = await fetchAllTags()
	categories.value = response
})
const selectedCategories = ref({});

// const selectedCategoryNames = computed(() => {
//   return categories.filter(category => selectedCategories.value[category]);
// });
</script>
