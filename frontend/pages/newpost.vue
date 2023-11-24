<template>
	<div id="postFormWrapper" class="mt-2 mb-16">
		<div class="max-w-3xl py-4 mx-auto prose">
			<div id="direct-editor">
				<EditorCard @newPostMaterial="publish" />
			</div>

			<!-- icons -->
			<div class="icons flex text-gray-500 m-2">

			</div>
			
			<!-- buttons -->
			<div class="buttons flex">
				<div v-if="postState">
					<p>Nytt innlegg lagt til!</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import EditorCard from '~/components/modules/Editor/EditorCard.vue';
import { postCreateNewPost } from '../composables/crud/postCreateNewPost';

definePageMeta({
	layout: "creating"
})

const baseURL = "http://localhost:8888/api/newpost/"

/** If this is true a success message is rendered */
const postState = ref<false | true | null>(null);

/** 
 * * Final publishing step 
 */
const publish = async (postContent:object) => {
	const responseData = await postCreateNewPost(baseURL, postContent)

	if (responseData) {
		postState.value = true

		setTimeout(() => {
			navigateTo("/minkonto");
		}, 1000);
	} else {
		// console.log("Failed to publish the post") // print to self
		return null
	}
}

</script>

<style scoped></style>
