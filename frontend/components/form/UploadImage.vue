<template>
	<div data-test="upload_image" class="flex justify-center">
		<InputFile class="text-xs hover:bg-secondaryFixedDim hover:text-onSecondaryFixedVariant p-1 rounded-md bg-secondary text-onSecondary" hidden @file-change="handleFile" accept="image/*" />
	</div>
</template>

<script setup lang="ts">

const emit = defineEmits(["fileChange"])

/** 
 * * The input accepts PNG and JPG files
 * ? Should I have something else/more?
 */

const selectedFile = ref<any>(null);

const handleFile = (event: any) => {
	if (event) {
		selectedFile.value = event.target.files[0];
	} 
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