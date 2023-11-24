<template>
	<div data-test="upload_image" class="flex justify-center">
		<InputFile class="p-1 rounded-md bg-secondary text-onSecondary" :label="label" hidden @file-change="handleFile" accept="image/*" />
	</div>
</template>

<script setup lang="ts">

const emit = defineEmits(["fileChange"])

/** 
 * * The input accepts PNG and JPG files
 * ? Should I have something else/more?
 */

const label = ref("Upload image")

const selectedFile = ref<any>(null);

/**
 * TODO: ! FORSTÅ DET - klare å implementere profile picture upload properly
 */

const handleFile = (event: any) => {
	selectedFile.value = event.target.files[0];
}

// Watcher to react to file selection changes
watchEffect(() => {
	if (selectedFile.value) {
		emit("fileChange", selectedFile.value)
		selectedFile.value = null
	}
})




</script>

<style scoped></style>