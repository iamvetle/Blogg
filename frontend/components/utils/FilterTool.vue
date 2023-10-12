<template>
	<div class="py-1">
		<div class="py-1 ml-2" v-for="category in categories" :key="category.name">
			<BaseCheckboxOption v-model="selectedCategories[category.name]" :label="category.name"  />
		</div>
		<!-- <div v-if="selectedCategoryNames">
			<span> 
				Custom url {{ customURL }}
			</span>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

/** 
 * I don not fant the fetch all tags to be fetched everytime I toggle the button, fix that
 * @todo - for some reasen the list articles are also being fetched again, fix that
 */

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
const categories = ref<Category[]>([])

onMounted(async () => {
	await fetchAllTags()
	categories.value = store.allTags ?? []
})

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
		url += `tags=${category}&`
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
	await fetchPostSnippets(customURL.value)
})

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

<style scoped>
.checkbox :checked {
	text-decoration: 'red';
}
</style>
