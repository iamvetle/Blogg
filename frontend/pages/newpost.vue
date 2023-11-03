<template>
	<div id="postFormWrapper" class="mt-2 mb-16">
		<Modal v-if="showModal" @selected="controlForPublish" />
		<div class="max-w-3xl py-4 mx-auto prose">
			<div id="direct-editor" :class="editorContainerClass">
				<EditorCard @newPostMaterial="publishPost" />
			</div>

			<!-- icons -->
			<div class="icons flex text-gray-500 m-2">
				<!-- <div class="count ml-auto text-gray-400 text-xs font-semibold">
            0/300
          	</div> -->
				<!-- Maybe later-->
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
	layout: "feed-layout"
})

/**
 * @todo
 * huske definepagedata senere
 */
const postState = ref<false | true | null>(null);
const showModal = ref(false)

let editorContainerClass = ref("w-full px-[60px] py-[30px] bg-white flex flex-col text-gray-800 border border-gray-300 shadow-lg")

const publishPost = async (request_body: any) => {


	// What I want: When the "publish" button is clicked on in the editor I want the modal
	// to show TWO options. One that is CONFIRM, and another that is CANCEL
	
	// I think i want this function to set showModal to true, so that the modal will be shown, and
	// when the modal is shown two options appear. One is confirm the other is cancel - which will automatically
	// happen if you exit
	const baseURL = "http://localhost:8888/api/newpost/"
	const response = await postCreateNewPost(baseURL, request_body)
	if (response) {
		postState.value = response.data
	} else {
		console.log("rectum")
	}

}

const controlForPublish = () => {
	return null
}

</script>

<style scoped></style>
