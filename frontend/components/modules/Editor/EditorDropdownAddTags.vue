<template>
	<div class="flex justify-between items-center">
		<div class="w-fit">
			<USelectMenu
				:options="(tags as any)"
				v-model="selected"
				searchable
				searchablePlaceholder="Add a tag ..."
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
							>{{ selected.length }} tags added</span
						>
						<span v-else>Add tags</span>
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
		<div v-if="selected" class="space-x-2">
			<BaseTag v-for="tag in selected" :key="tag" :text="tag"/>
		</div>
	</div>
</template>

<script setup lang="ts">


/** Holds all of the tags */
const tags = ref<any>([]);

const emit = defineEmits(["output"]);

/** State for all of the selected tags */
const selected = ref<string[]>([]);

/** Emits whenever a tag is selected or unselected */
//@ts-ignore
watch(
	selected,
	(newValue) => {
		// Your logic when 'selected' changes
		emit("output", newValue);
	},
	{ deep: true, immediate: false },
);

/** Fills up the tags with data/tags - and fetches from api */
onBeforeMount(async () => {

	const response = await getAllTags();
	if (response == null) {
		console.warn(
			"Fetching tags from api endpoint failed on editordropdownaddtags",
		); // print to self
	}
	if (response) {
		for (let tag of response) {
			tags.value.push(tag.name);
		}
	}
});

onMounted(() => {
	const stringSelectedtags = sessionStorage.getItem("postSelectedTags")
	const listSelectedTags = stringSelectedtags?.split(",") ?? []

	if (listSelectedTags.includes("") == false) {
		selected.value = listSelectedTags ?? []		
	}
})

onUnmounted(() => {

	// Turns the array of tags into a string with substring(?)
	const tagsSelected = String(selected.value);

	// Saves the tags in a session for storing
	sessionStorage.setItem("postSelectedTags", tagsSelected)
});

</script>

<style scoped></style>
