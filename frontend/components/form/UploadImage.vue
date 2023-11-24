<template>
	<div data-test="upload_image" class="flex justify-center">
		<InputFile class="p-1 rounded-md bg-secondary text-onSecondary" :label="label" hidden @file-change="handleFile" accept="image/png, image/jpeg" />
	</div>
</template>

<script setup lang="ts">

const emit = defineEmits(["fileChange"])

/**
 * TODO make it so that the label adheres to whether an image has been uploaded or not
 * 
 * The input accepts PNG and JPG files
 */

const label = ref("Upload image")

const selectedFile = ref(null);
const fileContent = ref('');

/**
 * ? Forstår lite av hva som står under - må 
 * TODO: ! FORSTÅ DET - klare å implementere profile picture upload properly
 */

const handleFile = (event: any) => {
	selectedFile.value = event.target.files[0];
}

// Watcher to react to file selection changes
watch(selectedFile, (newFile) => {
	if (!newFile) {
		fileContent.value = '';
		label.value = "Upload image"
		return;
	}

	const reader = new FileReader();
	reader.onload = (e: any) => {
		fileContent.value = e.target.result;
		label.value = "Change image"
		emit("fileChange", fileContent.value)

	};

	// Read the file based on its type
	//@ts-ignore 
	if (newFile.type.match('image.*')) {
		reader.readAsDataURL(newFile);
		//@ts-ignore
	} else if (newFile.type.match('text.*')) {
		reader.readAsText(newFile);
	} else {
		fileContent.value = '<p>Preview not available for this file type</p>';
	}
});


</script>

<style scoped></style>