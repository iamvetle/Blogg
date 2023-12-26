<template>
	<div data-test="filter_tags">
		<USelectMenu
			:options="tags"
			v-model="selected"
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
				<div class="text-md flex items-center">
					<span v-if="selected.length" class="break-words"
						>{{ selected.length }} filter</span
					>
					<span v-else>Filter</span>
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
const paginationStore = usePaginationStore();

/** State that holds all the tags - fetched */
const tags = ref(<string[]>[]);

/** State for all of the selected tags */
const selected = ref([]);

/**
 * Function that changes the url based on the selected tags and calls
 * 
 * @param items The selected tags
 */
const action = async (items: any) => {
	searchStore.tagFilterPart = items;

	/**
	 * Create a new url with tag paramaters
	 */
	paginationStore.activeFetchURL = constructURL(paginationStore.activeFetchURL);

	/** Fetches all posts again based on new url made w */
	await getPostMultipleSnippet(paginationStore.activeFetchURL);
};

/** Watches and calls 'action' when the selected list is updated */
watch(
	selected,
	(newValue) => {
		// Your logic when 'selected' changes
		action(newValue);
	},
	{ deep: true, immediate: false },
);

onBeforeMount(async () => {
	/** Fetches all tags */
	const response = await getAllTags();

	if (response) {
		for (let tag of response) {
			tags.value.push(tag.name);
		}
	}
});
</script>

<style scoped></style>
