<template>
	<div class="bg-blue-50 w-56" data-test="upload_image">
		<InputFile @file-change="handleFile" :class="inputClass" accept="image/png, image/jpeg" label="Upload File (label)" />
	</div>
</template>

<script setup lang="ts">

const emit = defineEmits(["fileChange"])

/**
 * TODO create an emit here that emits the image selected upwards to the parent component
 * * I do not think that should be to difficult
 * 
 * The input accepts PNG and JPG files
 */

withDefaults(defineProps<{
	inputClass: string;
	label?:string;
}>(), {
	inputClass: "bg-blue-50 w-56",
});


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
		return;
	}

	const reader = new FileReader();
	reader.onload = (e: any) => {
		fileContent.value = e.target.result;
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