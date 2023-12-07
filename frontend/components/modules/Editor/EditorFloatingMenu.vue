<template>
	<div>
		<!-- MODELS = LINK ADD, DISCARD POST -->
		<div data-test="modal_for_url_link_add" v-if="showModalAddLinkURL">
			<teleport to="#modal">
				<div>
					<EditorModalAddURLLink @confirm-adding-url="addURLModalMessage" @cancel="showModalAddLinkURL = false" />
				</div>
			</teleport>
		</div>
		<!-- Using $attrs here, so that the modal wont be included when doing :class at higher levels
		TODO Move the modals up/ to a different place
		-->
		<div v-bind="$attrs">
			<floating-menu :editor="editor" :tippy-options="{ 
				duration: 100,
				placement:'left',
				offset: [0, 120]
				}"
				 v-if="editor">
				<div class="flex bg-surfaceContainerHighest flex-col py-2 px-2 rounded-md not-prose space-y-4 items-center justify-center">
					<!-- Image -->
					<div data-test="add_image_button_sum" class="">
						<EditorButton class="" @click="handleAddImageClick" :icon="add_image_icon" alt="Add mage" data-test="add_image" />
						<input @change="handleFileChange" type="file" hidden ref="addImageRef" data-test="add_image_file_input" />
					</div>
					<!-- Link -->
					<EditorButton :is-active="editor.isActive('link')" @click="handleAddURLLinkClick" :icon="link_icon"
						alt="link" />
					<EditorButton :is-active="editor.isActive('heading', { level: 1 })" @click="toggleHeadingRun(editor, 1)"
						:icon="heading_1_icon" alt="heading 1" />
					<EditorButton :is-active="editor.isActive('heading', { level: 2 })" @click="toggleHeadingRun(editor, 2)"
						:icon="heading_2_icon" alt="heading 2" />
					<EditorButton @click="horizontalRuleRun(editor)" :icon="seperator_icon" alt="seperator" />
				</div>
			</floating-menu>
		</div>
	</div>
</template>

<script setup lang="ts">

const emit = defineEmits(["tryPublishPost", "discardEditingPost", "addImage"])

defineOptions({
	inheritAttrs:false
})

const props = defineProps<{
	editor: Editor | undefined
}>();

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

/** The add url link modal for a post  */
const showModalAddLinkURL = ref(false)

/** The discard modal for discarding a post */

const handleAddURLLinkClick = () => {
	showModalAddLinkURL.value = true
	// places the focus back on the editor
	props.editor?.commands.focus()
}

/**
 * MODAL CALLED
 * 
 * The add link modal calls this function after confirmation 
 * 
 * @param event - the link/string from the modal
 */
const addURLModalMessage = (URL: string) => {

	(props.editor as Editor).chain().focus().insertContent("asdasda").setLink({ href: URL, target: '_blank' }).run()
	showModalAddLinkURL.value = false
}

// Methods ->

// const toggleBold = () => {
// 	editor.value.chain().focus().toggleBold().run()
// }

const addImageRef = ref<any>(null)

/**
 * Through this I can "click" on an input (file) element
 * 
 * This sends a "click" to the hidden input element
 */
const handleAddImageClick = () => {
	addImageRef.value.click()
}

/**
 * Takes the event from selecting a file and emits it
 * 
 * @param event - the file
 */
const handleFileChange = (event: any) => {
	const file = event;
	emit("addImage", file)
}


</script>

<style scoped lang="scss"></style>