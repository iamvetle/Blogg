<template>
	<div>
		<div v-for="category in categories" :key="category.name">
			<BaseCheckboxOption v-model="selectedCategories[category.name]" :label="category.name" />
		</div>

		<div>
			Categories: {{ categories }}
			chosenCategories: {{ selectedCategories }}
		</div>
		<div v-if="categories">
			Selected named Categories: {{ filtered }}
			{{ selectedCategoryNames }}
		</div>
	</div>
</template>

<script setup>
import axios from 'axios'
import { useGeneralStore } from '~/store/generalStore';
/** 
 * The component is a base for filtering. It has input fields that can be 
 * customized. The component is susposed to be associated to a fetch function, or similar.
 * 
 * The component is NOT finished. An unfinished idea!  
 * 
 */


const selectedCategories = ref({})

const store = useGeneralStore()
const categories = ref([])
const filtered = ref([])

onMounted(async () => {
	await fetchAllTags()
	categories.value = store.allTags
})

// watchEffect(() => {

// 	filtered.value = Object.keys(selectedCategories.value).filter(key => selectedCategories.value[key])

// });

const selectedCategoryNames = computed(() => {
  return Object.keys(selectedCategories.value).filter(key => selectedCategories.value[key]);
});

/**
 * The difference between watchEffect and computed:
 * 
 * computed:
 * "lazy by nature". Will only re-evaluate if some of its reactive dependencies have changed.
 * It returns a readonly "ref" object.
 * 
 * watchEffect:
 * runs immediately when created and whenever reactive dependencies change.
 * It does not return a new "ref", instead you directly manipulate other "ref"s
 * or execute side effects within it.
 * 
 * a side effect like making an api call.
 */

</script>
