<template>
	<div class="p-2">
		<div id="editor-container" class="w-full min-h-[270px] mb-12" @click="editor.commands.focus()">
			<div v-if="showModal">
				<teleport to="#modal">
					<div class="w-full h-screen blur-sm">
						<Modal
						@confirm-published="publishPost"
						@cancel-published="cancelPublishing"
						/>
					</div>
				</teleport>
			</div>
			<div id="editor-area" class="w-full">

				<EditorFloatingMenu :editor="editor" @addImage="addImage" @setLink="setLink"
					@toggleHeading1="toggleHeading(1)" @toggleHeading2="toggleHeading(2)"
					@setHorizontalRule="horizontalRule" />

				<bubble-menu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }"
					class="not-prose space-x-3 flex items-center rounded-md border p-1 bg-plain shadow-md">

					<EditorButton :is-active="editor.isActive('bold')" @button-click="toggleBold()" :icon="bold_icon"
						alt="bold" />

					<EditorButton :is-active="editor.isActive('italic')" @button-click="toggleItalic()" :icon="italic_icon"
						alt="italic" />

					<EditorButton :is-active="editor.isActive('underline')" @button-click="toggleUnderline()"
						:icon="underline_icon" alt="underline" />

					<EditorButton :is-active="editor.isActive('code')" @button-click="toggleCode()" :icon="code_snip_icon"
						alt="code" />

					<EditorButton :is-active="editor.isActive('blockquote')" @button-click="toggleBlockquote()"
						:icon="double_quotes_icon" alt="blockquote" />
				</bubble-menu>

				<div>
					<editor-content :editor="editor" />
				</div>
				<EditorCardTopMenu
				:editor="editor"/>

			</div>

		</div>
		<hr class="mb-4">
		<div class="buttons flex">
			<button id="cancel"
				class="btn border border-secondary-low p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-gray-400 hover:border-secondary-base ml-auto"
				@click="buttonCancelClick">
				Cancel
			</button>
			<button id="publish"
				class="btn border border-indigo-base p-1 px-4 font-semibold cursor-pointer text-plain ml-2 bg-secondary-base hover:bg-secondary-low"
				@click="buttonTryPublishClick">
				Publish
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
//@ts-nocheck
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3';
import Document from '@tiptap/extension-document' // required
import BulletList from '@tiptap/extension-bullet-list'
import CodeBlock from '@tiptap/extension-code-block'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Code from '@tiptap/extension-code'
import Strike from '@tiptap/extension-strike'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import Blockquote from '@tiptap/extension-blockquote'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import History from '@tiptap/extension-history'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Youtube from '@tiptap/extension-youtube'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import CharacterCount from '@tiptap/extension-character-count'

import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import Highlight from '@tiptap/extension-highlight'

// Images (svgs)
import underline_icon from '~/assets/icons/underline.svg'
import code_snip_icon from '~/assets/icons/code-view.svg'
import double_quotes_icon from '~/assets/icons/double-quotes-r.svg'
import italic_icon from '~/assets/icons/italic.svg'
import bold_icon from '~/assets/icons/bold.svg'

import { useGeneralStore } from '~/store/generalStore';

const generalStore = useGeneralStore()
const emit = defineEmits(['newPostMaterial'])

const errorHappened = ref(null)

/**
 * This variable dictates whether the Modal is shown or not.
 * 
 * True: Modal is shown. 
 * False: Modal is hidden.
*/
const showModal = ref(false)

const html = ref(null)

/** This two are just so that I can share them between the button 
 * click function and the modal publish function*/
const title = ref(null)
const body = ref(null)

const editor = useEditor({
	"type": "doc",
	content: '',
	extensions: [
		Heading.configure({
			levels: [1, 2, 3]
		}),
		Blockquote,
		Subscript,
		BulletList,
		Image.configure({
			allowBase64: true,
		}),
		CodeBlock.configure({
			exitOnTripleEnter: true,
			languageClassPrefix: 'javascript',
		}),
		HardBreak.configure({
			keepMarks: false,
		}),
		HorizontalRule,
		ListItem,
		OrderedList,
		Superscript,
		Subscript,
		Strike,
		Gapcursor,
		Table.configure({
			resizable: true,
		}),
		TableRow,
		TableHeader,
		TableCell,
		History,
		Youtube.configure({
			nocookie: true,
		}),
		Dropcursor,
		Document,
		Paragraph,
		Text, // required
		TaskList,
		TaskItem.configure({
			nested: true,
		}),
		Italic,
		Link.configure({
			validate: href => /^https?:\/\//.test(href),
		}),
		Bold,
		Underline,
		Code,
		// Youtube,
		Placeholder.configure({
			placeholder: 'Write something ...'
		}),

	],

	editorProps: {
		attributes: {
			class: 'm-5 focus:outline-none',
			// class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',	
		},
	},
	autofocus: 'start'
})

/**
 * Tracks the "emptyness" of the editor
 */
const isEditorEmpty = computed(() => !editor.value?.content?.trim());

/**
 * On update it takes and updates the HTML value?
 */
onMounted(() => {
	editor.value.on("update", () => {
		html.value = editor.value.getHTML()
	})
})

// BUTTON ACTIONS

/**
 * Button action
 * 
 * Is called when the 'new post' button is clicked.
 * 
 * It is called before showing the modal
 * 
 * It checks if the text is valid (has content and such), and
 * then opens the Modal to give options to the web client.
 */
const buttonTryPublishClick = async () => {

	/** 
	 * Retrieves the text that has been written in the 
	 * text editor, as HTML.
	 */
	html.value = editor.value.getHTML()

	/**
	 * @function extractTitleAndContent
	 * 
	 * The function takes the whole HTML text that whas been written 
	 * and extracts a title out of it.
	 * 
	 * A 'body' and a 'title' data is then returned
	 * 
	 * @param html.value - The raw HTML text body that the function is going
	 * to process.
	 * 
	 * @return - Object with two strings, or object with null
	 */
	// I just didn't know what to name it as
	const answer = extractTitleAndContent(html.value)

	title.value = answer?.title
	body.value = answer?.body

	/** If the title or body is null an alert is given, and the process is stopped */
	if ((title.value == null) || (body.value == null)) {
	
		console.log(`Somethign went wrong. body: ${body}. title: ${title} `) // print to self
		alert("Something went wrong. See console log")

		/** @todo - make this do someting */
		errorHappened.value = true // LOOK ERE":: Can I maybe use provide and inject between pages and layout for h-sceeen at such?

		// Exited, stopped
		return null

	/** 
	 * If the return object has actual values 
	 * The Modal is shown.
	 * 
	 * Basically says: The post can be published now.
	 */
	} else {
		showModal.value = true
		
		/** This calls the store function that controls the background */
		generalStore.turnBackgroundForModel("blur-sm")
		

		// tele port for mobile conditional rendering? disable teleport por? still hav to telefport to "app" vueuse use breakpoints - breakpoints tailwind??
	}
}

/**
 * Button action
 * 
 * Clears and empties the entire content. Then redirects the user "back",
 * probebly to the feed page.
 * 
 * Is called when the 'cancel' button is clicked.
 */
const buttonCancelClick = () => {
	const router = useRouter()
	editor.value.commands.clearContent
	const place = "/"
	html.value = ""

	return navigateTo(place)
}

// MODAL EMITS/EVENTS 2/2

/** The modal can return TWO things */

// 1/2
/** 
 * Button action
 * 
 * This tells the parent container that the post made wants to
 * be published. It emits an event with the content data
 * 
 * It is only called by the modal
 */
const publishPost = () => {
	showModal.value = false
	generalStore.turnBackgroundForModel(null)

	const htmlData = {
			"title": title.value,
			"content": body.value,
		}

	emit('newPostMaterial', htmlData)
	html.value = ""

	editor.value.chain().focus().clearContent().run()
}

// 2/2
/**
 * It is called by the modal and it stops the process of making the post.
 */
const cancelPublishing = () => {
	showModal.value = false
	generalStore.turnBackgroundForModel(null)
	return null
}


/** METHODS FOR THE EDITOR */

const setLink = () => {
	const previousUrl = editor.value.getAttributes('link').href
	const url = window.prompt('URL', previousUrl)

	// cancelled
	if (url === null) {
		return
	}

	// empty
	if (url === '') {
		editor.value
			.chain()
			.focus()
			.extendMarkRange('link')
			.unsetLink()
			.run()

		return
	}

	// update link
	editor.value
		.chain()
		.focus()
		.extendMarkRange('link')
		.setLink({ href: url })
		.run()
}

function addImage() {
	const url = window.prompt('URL')

	if (url) {
		editor.value.chain().focus().setImage({ src: url }).run()
	}
}

const toggleHeading = (level) => {
	editor.value.chain().focus().toggleHeading({ level }).run();
};

const horizontalRule = () => {
	editor.value.chain().focus().setHorizontalRule().run()
};

const toggleUnderline = () => {
	editor.value.chain().focus().toggleUnderline().run()
}

const toggleCode = () => {
	editor.value.chain().focus().toggleCode().run()
}

const toggleBlockquote = () => {
	editor.value.chain().focus().toggleBlockquote().run()

}

const toggleBold = () => {
	editor.value.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
	editor.value.chain().focus().toggleItalic().run()
}















</script>

<style scoped lang="scss">
/* Basic editor styles */
.tiptap {
	>*+* {
		margin-top: 0.75em;
	}
	img {
    max-width: 100%;
    height: auto;
  }
}

.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}


blockquote {
	padding-left: 1rem;
	border-left: 3px solid rgba(#0D0D0D, 0.1);
}

ul,
ol {
	padding: 0 1rem;
}

pre {
	background: #0D0D0D;
	color: #FFF;
	font-family: 'JetBrainsMono', monospace;
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;

	code {
		color: inherit;
		padding: 0;
		background: none;
		font-size: 0.8rem;
	}
}

hr.ProseMirror-selectednode {
	border-top: 1px solid #68CEF8;
}



img {
	max-width: 100%;
	height: auto;

	&.ProseMirror-selectednode {
		outline: 3px solid #68CEF8;
	}
}

.tiptap {
	table {
		border-collapse: collapse;
		table-layout: fixed;
		width: 100%;
		margin: 0;
		overflow: hidden;

		td,
		th {
			min-width: 1em;
			border: 2px solid #ced4da;
			padding: 3px 5px;
			vertical-align: top;
			box-sizing: border-box;
			position: relative;

			>* {
				margin-bottom: 0;
			}
		}

		th {
			font-weight: bold;
			text-align: left;
			background-color: #f1f3f5;
		}

		.selectedCell:after {
			z-index: 2;
			position: absolute;
			content: "";
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(200, 200, 255, 0.4);
			pointer-events: none;
		}

		.column-resize-handle {
			position: absolute;
			right: -2px;
			top: 0;
			bottom: -2px;
			width: 4px;
			background-color: #adf;
			pointer-events: none;
		}

		p {
			margin: 0;
		}
	}
}

.tableWrapper {
	padding: 1rem 0;
	overflow-x: auto;
}

.resize-cursor {
	cursor: ew-resize;
	cursor: col-resize;
}

ul[data-type="taskList"] {
	list-style: none;
	padding: 0;

	p {
		margin: 0;
	}

	li {
		display: flex;

		>label {
			flex: 0 0 auto;
			margin-right: 0.5rem;
			user-select: none;
		}

		>div {
			flex: 1 1 auto;
		}

		ul li,
		ol li {
			display: list-item;
		}

		ul[data-type="taskList"]>li {
			display: flex;
		}
	}
}

code {
    font-size: 0.9rem;
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(#616161, 0.1);
    color: #616161;
    box-decoration-break: clone;
  }

  mark {
  background-color: #ffe066;
  padding: 0.125em 0;
  border-radius: 0.25em;
  box-decoration-break: clone;
}

a {
    color: #68CEF8;
  }
</style>