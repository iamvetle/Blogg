<template>
	<div id="postFormWrapper" class="mt-2 mb-16">
		<div v-if="showModal" id="modal-wrap">
			<Modal @confirmPublished="confirmPublication" @cancelPublished="cancelPublication"/>
		</div>
		<div class="max-w-3xl py-4 mx-auto prose">
			<div id="direct-editor" :class="editorContainerClass">
				<EditorCard @newPostMaterial="publishPost" />
			
			
				<!-- Det jeg ideelt ønsker at at EditorCard vil klare å sende en emit som setter fram en popup
				eller modal som gir deg valget mellom "bekreft" eller "cancel". Jeg vil gjøre ting på page-level derfor
			må jeg i teorien først sende en emit hit, og deretter sende en prop ned til modal for så å få en emit tilbake og deretter sende den
		til editorcard for så å få en response tilbake igjen.
	
	det blir for mye, og jeg trenger å finne en annen løsning. Og jeg tror ikke at slots er løsningen her.

	på akkurat dette:
		er jeg stuck-->


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

const showModal = ref<boolean>(false)
const request = ref<any>(null)
const baseURL = "http://localhost:8888/api/newpost/"



const postState = ref<false | true | null>(null);

let editorContainerClass = ref("w-full px-[60px] py-[30px] bg-white flex flex-col text-gray-800 border border-gray-300 shadow-lg")

const publishPost = async (request_body: any) => {


	// What I want: When the "publish" button is clicked on in the editor I want the modal
	// to show TWO options. One that is CONFIRM, and another that is CANCEL
	
	// I think i want this function to set showModal to true, so that the modal will be shown, and
	// when the modal is shown two options appear. One is confirm the other is cancel - which will automatically
	// happen if you exit
	request.value = request_body
	showModal.value = true

	// const response = await postCreateNewPost(baseURL, request_body)

	// if (response) {
	// 	postState.value = response.data
	// } else {
	// 	console.log("rectum")
	// }

}

const confirmPublication = async () => {
	const response = await postCreateNewPost(baseURL, request.value)

	if (response) {
		postState.value = response.data
	} else {
		console.log("rectum")
	}}

const cancelPublication = () => {
	return null
}

</script>

<style scoped></style>
