<template>
	<div class="pt-2 bg-background">
		<div id="direct-editor" class="mx-auto">
			<ClientOnly>
				<!-- <EditorCardChooseTags/> -->
				<div>
					<FilterDropdownTags @output="action" :options="tags"/>
				</div>
				<div>
					<pre>{{ selected }}</pre>
				</div>
				<EditorCard @newPostMaterial="publish" @charactersCount="handleCharacters" data-test="editorcard"/>
			</ClientOnly>
			<span class="block pl-8 pb-6">{{ charCount }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "creating",
	middleware: ["auth-guard"],
});

const baseURL = urls.api.posts.singlePost.action.newPost;

/** If this is true a success message is rendered */
const postState = ref<false | true | null>(null);

/** Contains all tags */
const tags = ref<string[]>([])

/** Contains only the selected tags */
const selected = ref<any>([])

/**
 * * Final publishing step
 */
const publish = async (formData: any) => {
	const responseData = await postCreateNewPost(baseURL, formData);

	if (responseData) {
		postState.value = true;

		setTimeout(() => {
			navigateTo("/minkonto");
		}, 1000);
	} else {
		// console.log("Failed to publish the post") // print to self
		return null;
	}	
};

const action = (items:any) => {
	selected.value = items
}

/** Fill characters */
const handleCharacters = (event: number) => {
	charCount.value = event
}

onBeforeMount(async () => {
    /** Fetches all tags */
    const response = await getAllTags()

    if (response) {
            for (let tag of response) {
                tags.value.push(tag.name)
        }

    }
})

const charCount = ref(0)

</script>

<style scoped></style>
