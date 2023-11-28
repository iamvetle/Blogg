<template>
	<div>
		<floating-menu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }"
			class="not-prose flex-col items-center md:flex-row relative md:-left-[225px] -left-[80px] flex md:space-x-3 rounded-md border max-md:space-y-3 p-1 bg-plain shadow-md">

			<div data-test="add_image_button_sum">
				<EditorButton @click="handleAddImageClick" :icon="add_image_icon" alt="add_image" data-test="add_image" />
				<input @change="handleFileChange" type="file" hidden ref="addImageRef"
					data-test="add_image_file_input" />
			</div>

			<EditorButton :is-active="editor.isActive('link')" @click="setLink" :icon="link_icon" alt="link" />
			<EditorButton :is-active="editor.isActive('heading', { level: 1 })" @click="toggleHeading(1)"
				:icon="heading_1_icon" alt="heading 1" />
			<EditorButton :is-active="editor.isActive('heading', { level: 2 })" @click="toggleHeading(2)"
				:icon="heading_2_icon" alt="heading 2" />
			<EditorButton @click="horizontalRule" :icon="seperator_icon" alt="seperator" />

		</floating-menu>
	</div>
</template>

<script setup lang="ts">

const emit = defineEmits(["addImage"])
/**
 * This component is part of the text editor. It is the floating menu.
 */

// Images (svgs)
import add_image_icon from '~/assets/icons/image-add-line.svg'

import link_icon from '~/assets/icons/link.svg'
import seperator_icon from '~/assets/separator.svg'

import heading_1_icon from '~/assets/icons/h1.svg'
import heading_2_icon from '~/assets/icons/h2.svg'

import { FloatingMenu } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core';

const addImageRef = ref<any>(null)

// const emit = defineEmits()

const props = defineProps<{
	editor: Editor | undefined
}>();

/**
 * Through this I can "click" on an input (file) element
 * 
 * This sends a "click" to the hidden input element
 */
const handleAddImageClick = () => {
	addImageRef.value.click()
}

const handleFileChange = (event:any) => {
    const file = event;
    emit("addImage", file)
}


const toggleHeading = (level: any) => {
	(props.editor as Editor).chain().focus().toggleHeading({ level }).run();
};

// husk at hermer etter medium

const horizontalRule = () => {
	(props.editor as Editor).chain().focus().setHorizontalRule().run()
};
const setLink = () => {
	const previousUrl = (props.editor as Editor).getAttributes('link').href
	const url = window.prompt('URL', previousUrl)

	// cancelled
	if (url === null) {
		return
	}

	// empty
	if (url === '') {
		(props.editor as Editor)
			.chain()
			.focus()
			.extendMarkRange('link')
			.unsetLink()
			.run()

		return
	}

	// update link
	(props.editor as Editor)
		.chain()
		.focus()
		.extendMarkRange('link')
		.setLink({ href: url })
		.run()
}



</script>

<style scoped lang="scss"></style>