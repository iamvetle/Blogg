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
				<div class="text-md flex items-center">
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
useWatchFeedDropdownFilter();

onBeforeMount(async () => {
	const response = await getAllTags();

	if (response) {
		for (let tag of response) {
			tags.value.push(tag.name);
		}
	}
});

/**
 * ? maybe I should have a "isReady" for most components?
 */
const isReady = computed(() => searchStore.tagFilterPart);
</script>

<style scoped></style>
