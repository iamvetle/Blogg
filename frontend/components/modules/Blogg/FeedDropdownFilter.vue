<template>
	<div data-test="filter_tags" v-if="isReady">
		<!-- v-model changes the selected tags directly -->
		<USelectMenu
			:options="tags"
			v-model="searchStore.tagFilterPart"
			searchable
			searchablePlaceholder="Search a tag..."
			multiple
			placeholder="Option tags"
			size="lg"
			selectClass="items-center bg-primaryContainer text-onPrimaryContainer outline-none text-sm"
		>
			<template #leading>
				<Icon name="filter" size="1rem" />
			</template>

			<!-- When closed -->
			<template #label>
				<div class="text-md flex items-center" v-if="searchStore.tagFilterPart.length">
					<span class="break-words"
						>{{ searchStore.tagFilterPart.length }} filter</span
					>
				</div>
			</template>

			<!-- The options when open-->
			<template #option="{ option: tag }">
				<div class="text-sm">
					<span class="truncate">{{ tag }}</span>
				</div>
			</template>
		</USelectMenu>
	</div>
</template>

<script setup lang="ts">

const searchStore = useSearchStore();

/** State that holds all the tags - fetched */
const tags = ref(<string[]>[]);

/** Watches how to */

onMounted(async () => {
	console.debug("is this printet")
	const response = await getAllTags();

	if (response) {
		console.debug("is this printet ")
		for (let tag of response) {
			console.debug(tag)
			tags.value.push(tag.name);
		}
	}
});
// useWatchFeedDropdownFilter();


/**
 * ? maybe I should have a "isReady" for most components?
 * 
 * ! through an error if I shorten it to just => sea..
 * ! TO SELF: to not use ? with .value, that is reactive referances
 */

// THIS under, also works
// const isReady = computed(() => {
// 	if (searchStore.tagFilterPart.value) {
// 		return true
// 	} else {
// 		return false
// 	}
// })

const isReady = computed(() => searchStore.tagFilterPart ? true : false)
</script>

<style scoped></style>
