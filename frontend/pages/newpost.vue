<template>
	<div id="postFormWrapper" class="mt-2 mb-16">
		<div class="max-w-3xl py-4 mx-auto prose">
			<div id="direct-editor" :class="editorContainerClass">
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
	layout: "default"
})

const baseURL = "http://localhost:8888/api/newpost/"

/** If this is true a success message is rendered */
const postState = ref<false | true | null>(null);


/** 
 * This controls the outer-styling that the text editor has and can be
 * changed dynamically.
 */
const editorContainerClass = ref("w-full px-[60px] py-[30px] bg-white flex flex-col text-gray-800 border border-gray-300 shadow-lg")

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
