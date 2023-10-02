<template>
	<div id="postFormWrapper" class="mt-2 mb-16">
		<div class="max-w-3xl py-4 mx-auto prose">
			<div id="direct-editor"
				:class="editorContainerClass"
				
				>
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

// huske definepagedata senere

const postState = ref<false | true | null>(null);

let editorContainerClass = ref("w-full px-[60px] py-[30px] bg-white flex flex-col text-gray-800 border border-gray-300 shadow-lg")

watchEffect(() => {
	if (postState.value == true) { 
		return editorContainerClass.value = "w-full px-[60px] py-[30px] bg-white flex flex-col text-gray-800 border border-green-300 shadow-lg"	
}
if (postState.value == false) {
	return editorContainerClass.value = "w-full px-[60px] py-[30px] bg-white flex flex-col text-gray-800 border border-red-300 shadow-lg"	
}

})


const publishPost = async (request_body: object) => {
	const baseURL = "http://localhost:8888/api/newpost/"
	postState.value = await createNewPost(baseURL, request_body)
}
</script>

<style scoped></style>
