<template>
	<div class="pt-2 bg-background">
		<div id="direct-editor" class="mx-auto">
			<ClientOnly>
				<!-- <EditorCardChooseTags/> -->
				<EditorCard @newPostMaterial="publish" />
			</ClientOnly>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "creating",
	middleware: ["auth-guard"],
});

import EditorCard from "~/components/modules/Editor/EditorCard.vue";

const baseURL = urls.api.posts.singlePost.action.newPost;

/** If this is true a success message is rendered */
const postState = ref<false | true | null>(null);

/**
 * * Final publishing step
 */
const publish = async (postContent: object) => {
	const responseData = await postCreateNewPost(baseURL, postContent);

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
</script>

<style scoped></style>
