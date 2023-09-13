iiiiiiiiiiii<template>
	<div class="grid-cols-12 grid">
		<div class="md:col-start-4 md:col-span-6 col-start-3 col-span-8 border" id="editor-container">
		<div id="editor-area">
			<floating-menu
			:editor="editor"
			:tippy-options=" { duration: 100 }"
			v-if="editor"
			class="flex-col items-center md:flex-row relative md:-left-[225px] -left-[80px] flex md:space-x-3 rounded-md border max-md:space-y-3 p-1 bg-plain shadow-md"
			>
				<button @click="editor.commands.toggleBold()" :class="{ 'is-active': editor.isActive('bold')}"
				class="flex">
				<img class="h-5 flex items-center" src="~/assets/icons/bold.svg">
			</button>
	
				<button @click="editor.commands.toggleItalic()" :class="{ 'is-active': editor.isActive('italic') }"
				class="flex">
				<img class="h-5 flex items-center" src="~/assets/icons/italic.svg">
			</button>
	
				<button @click="setLink()" :class="{ 'is-active': editor.isActive('link')}"
				class="flex">
				<img class="h-5 flex items-center" src="~/assets/icons/link.svg">
			</button>
	
				<button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
				class="flex">
				<img class="h-5 flex items-center" src="~/assets/icons/h-1.svg">
			</button>
	
				<button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
				class="flex">
				<img class="h-5 flex items-center" src="~/assets/icons/h-2.svg">
			</button>
	
				<button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/quote-text.svg">
			</button>
	
	
	
	
	
			</floating-menu>
			<bubble-menu
			:editor="editor"
			:tippy-options=" { duration: 100 }"
			v-if="editor"
			class="space-x-3 flex items-center rounded-md border p-1 bg-plain shadow-md"
			>
				<button @click="editor.commands.toggleBold()" :class="{ 'is-active': editor.isActive('bold')}"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/bold.svg">
			</button>
	
				<button @click="editor.commands.toggleItalic()" :class="{ 'is-active': editor.isActive('italic') }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/italic.svg">
			</button>
	
				<button @click="setLink()" :class="{ 'is-active': editor.isActive('link')}"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/link.svg">
			</button>
	
				<button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/h-1.svg">
			</button>
	
				<button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/h-2.svg">
			</button>
	
				<button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }"
				class="">
				<img class="h-5 flex items-center" src="~/assets/icons/quote-text.svg">
			</button>
	
	
	
	
	
			</bubble-menu>
			<editor-content :editor="editor" />
		</div>
		<!-- <pre><code>{{ html }}</code></pre> -->
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

const editor = useEditor({
"type": "doc",
	content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
	extensions: [
	Heading.configure({
	levels: [2,3,4]
	}),
	Blockquote,
	Image,
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

</script>

<style scoped>

</style>