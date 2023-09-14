<template>
	<div class="p-2">
		<div class="w-full min-h-[280px]" id="editor-container">
		<div id="editor-area">
			<floating-menu
			:editor="editor"
			:tippy-options=" { duration: 100 }"
			v-if="editor"
			class="flex-col items-center md:flex-row relative md:-left-[225px] -left-[80px] flex md:space-x-3 rounded-md border max-md:space-y-3 p-1 bg-plain shadow-md"
			>
			<button @click="addImage()">
				<img class="h-5 flex items-center" src="~/assets/icons/image-add-line.svg" alt="add_image">
			</button>
	
			<button @click="setLink()" :class="{ 'is-active': editor.isActive('link')}"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/link.svg" alt="link">
			</button>

			<button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/h-1.svg">
			</button>
	
				<button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/h-2.svg">
			</button>

			<button @click="editor.chain().focus().setHorizontalRule().run()">
				<img class="h-5 flex items-center" src="~/assets/separator.svg" alt="seperator">
			</button>		
	
	
			</floating-menu>
			<bubble-menu
			:editor="editor"
			:tippy-options=" { duration: 100 }"
			v-if="editor"
			class="space-x-3 flex items-center rounded-md border p-1 bg-plain shadow-md"
			>
			<button @click="editor.commands.toggleBold()" :class="{ 'is-active': editor.isActive('bold') }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/bold.svg">
			</button>
	
				<button @click="editor.commands.toggleItalic()" :class="{ 'is-active': editor.isActive('italic') }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/italic.svg">
			</button>

			<button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
				<img class="h-5 flex items-center" src="~/assets/icons/underline.svg">
			</button>

			<button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
				<img class="h-5 flex items-center" src="~/assets/icons/code-view.svg" alt="code">
			</button>
	
				<button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/double-quotes-r.svg">
			</button>
	
			</bubble-menu>
			<div>
				<editor-content :editor="editor" />
			</div>

		</div>
		<!-- <pre><code>{{ html }}</code></pre> -->
		</div>
		<div class="buttons flex pt-32">
		<button
		class="btn border border-secondary-low p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-gray-400 hover:border-secondary-base ml-auto"
		@click="editor.commands.clearContent"
		>
			Cancel
		</button>
		<button
		@click="newPostMaterial"
			class="btn border border-indigo-base p-1 px-4 font-semibold cursor-pointer text-plain ml-2 bg-secondary-base hover:bg-secondary-low"
		>
			Post
		</button>
		</div>
</div>
</template>

<script setup>
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import Blockquote from '@tiptap/extension-blockquote'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Starterkit from '@tiptap/starter-kit'

const emit = defineEmits()

const editor = useEditor({
"type": "doc",
	content: '<h2>- title</h2><p>- content</p>',
	extensions: [
	Heading.configure({
	levels: [1,2,3,4]
	}),
	Blockquote,
	Image,
	Starterkit,
	Dropcursor,
	Document,
	Paragraph,
	Text,
	Italic,
	Link,
	Bold,
	FloatingMenu,

	],
	editorProps: {
	attributes: {
	class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
	},
},
})

const html = ref(null)

onMounted(() => {
editor.value.on("update", () => {
html.value = editor.value.getHTML()
})

})

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

// medium (når hover):
// ""BUBBLEMENU" bold, italic, link, h3, h4, blockquote, (private comment)
// ""FLOATINGMENU" bold, italic, link, h3, h4, blockquote, (private comment)


// methods 

function addImage() {
	const url = window.prompt('URL')

	if (url) {
		editor.value.chain().focus().setImage({ src: url }).run()
	}
	}


const newPostMaterial = async () => {

	const { title, body } = extractTitleAndContent(html.value)

	console.log(title)
	let request_body = {
		"title":title,
		"content":body,
	}

	// emit to parent component
	emit('newPostMaterial', request_body)

	editor.value.commands.clearContent()
}
</script>

<style scoped>

</style>