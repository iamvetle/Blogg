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
		-->
		<div v-bind="$attrs">
			<floating-menu :editor="editor" :tippy-options="{
				duration: 100,
				placement: 'left',
				offset: [0, 120]
			}" v-if="editor">
				<div
					class="flex bg-surfaceContainerHighest flex-col py-2 px-2 rounded-md not-prose space-y-4 items-center justify-center">

					<!-- Image -->
					<div data-test="add_image_button_sum" class="">
						<EditorButton class="" @click="handleAddImageClick" :icon="add_image_icon" alt="Add image"
							data-test="add_image" />
						<input @change="handleFileChange" type="file" hidden ref="addImageRef"
							data-test="add_image_file_input" />
					</div>

					<!-- Link -->
					<EditorButton @click="handleAddURLLinkClick" data-test="url_link_option" :icon="url_link_add_icon"
						alt="Add link" :is-active="editor.isActive('link')" />

					<!-- Seperator-->
					<EditorButton @click="horizontalRuleRun(editor)" :icon="seperator_icon" alt="Add seperator" />

					<!-- Blockquote-->
					<EditorButton data-test="blockquote_option" :is-active="editor.isActive('blockquote')"
						@click="toggleBlockquoteRun(editor)" :icon="blockquote_icon" alt="Blockquote" />

					<!-- Codeblock-->
					<EditorButton data-test="codeblock_option" :is-active="editor.isActive('codeBlock')"
						@click="toggleCodeBlockRun(editor)" :icon="codeblock_icon" alt="Codeblock" />

				</div>
			</floating-menu>
		</div>
	</div>
</template>

<script setup lang="ts">

const emit = defineEmits(["addImage"])

defineOptions({
	inheritAttrs: false
})

const props = defineProps<{
	editor: Editor | undefined
}>();

/**
 * This component is part of the text editor. It is the floating menu.
 */

// Images (svgs)
import add_image_icon from '~/assets/icons/image-add-line.svg'

import url_link_add_icon from '~/assets/icons/link_add.svg'
import seperator_icon from '~/assets/separator.svg'

import blockquote_icon from '~/assets/icons/double-quotes-r.svg'
import codeblock_icon from '~/assets/icons/codeblock_icon.svg'

import { FloatingMenu } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core';

/** The add url link modal for a post  */
const showModalAddLinkURL = ref(false)

const handleAddURLLinkClick = () => {
	showModalAddLinkURL.value = true
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

	(props.editor as Editor).chain().focus().setLink({ href: URL, target: '_blank' }).insertContent(URL).run()
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