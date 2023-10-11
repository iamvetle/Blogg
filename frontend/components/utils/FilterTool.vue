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
