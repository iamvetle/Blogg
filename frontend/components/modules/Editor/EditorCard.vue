<template>
  <div class="p-2">
    <div
      id="editor-container"
      class="w-full min-h-[280px]"
    >
      <div id="editor-area">
        <floating-menu
          v-if="editor"
          :editor="editor"
          :tippy-options=" { duration: 100 }"
          class="flex-col items-center md:flex-row relative md:-left-[225px] -left-[80px] flex md:space-x-3 rounded-md border max-md:space-y-3 p-1 bg-plain shadow-md"
        >
          <button @click="addImage()">
            <img
              class="h-5 flex items-center"
              :src="add_image_icon"
              alt="add_image"
            >
          </button>
	
          <button
            :class="{ 'is-active': editor.isActive('link')}"
            class=""
            @click="setLink()"
          >
            <img
              class="h-5 flex items-center"
              :src="link_icon"
              alt="link"
            >
          </button>

          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            class=""
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <img
              class="h-5 flex items-center"
              :src="heading_1_icon"
            >
          </button>
	
          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            class=""
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          >
            <img
              class="h-5 flex items-center"
              :src="heading_2_icon"
            >
          </button>

          <button @click="editor.chain().focus().setHorizontalRule().run()">
            <img
              class="h-5 flex items-center"
              :src="seperator_icon"
              alt="seperator"
            >
          </button>
        </floating-menu>
        <bubble-menu
          v-if="editor"
          :editor="editor"
          :tippy-options=" { duration: 100 }"
          class="space-x-3 flex items-center rounded-md border p-1 bg-plain shadow-md"
        >
          <button
            :class="{ 'is-active': editor.isActive('bold') }"
            class=""
            @click="editor.commands.toggleBold()"
          >
            <img
              class="h-5 flex items-center"
              :src="bold_icon"
            >
          </button>
	
          <button
            :class="{ 'is-active': editor.isActive('italic') }"
            class=""
            @click="editor.commands.toggleItalic()"
          >
            <img
              class="h-5 flex items-center"
              :src="italic_icon"
              alt="italic"
            >
          </button>

          <button
            :class="{ 'is-active': editor.isActive('underline') }"
            @click="editor.chain().focus().toggleUnderline().run()"
          >
            <img
              class="h-5 flex items-center"
              :src="underline_icon"
            >
          </button>

          <button
            :class="{ 'is-active': editor.isActive('code') }"
            @click="editor.chain().focus().toggleCode().run()"
          >
            <img
              class="h-5 flex items-center"
              :src="code_snip_icon"
              alt="code"
            >
          </button>
	
          <button
            :class="{ 'is-active': editor.isActive('blockquote') }"
            class=""
            @click="editor.chain().focus().toggleBlockquote().run()"
          >
            <img
              class="h-5 flex items-center"
              :src="double_quotes_icon"
            >
          </button>
        </bubble-menu>
        <div>
          <editor-content :editor="editor" />
        </div>
      </div>
      <div v-if="errorHappened === true">
        nothing was posted -> an error happened. something was wrong with the input
      </div>
      <div v-if="errorHappened === false">
        Everything went A OK
      </div>	
    </div>
    <div class="buttons flex pt-32">
      <button
        class="btn border border-secondary-low p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-gray-400 hover:border-secondary-base ml-auto"
        @click="cancelClick"
      >
        Cancel
      </button>
      <button
        class="btn border border-indigo-base p-1 px-4 font-semibold cursor-pointer text-plain ml-2 bg-secondary-base hover:bg-secondary-low"
        @click="newPostMaterial"
      >
        Post
      </button>
    </div>
    <hr class="my-12">
    <div class="pt-[70px] pb-[60px]">
      <pre><code>{{ html }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3';
import Document from '@tiptap/extension-document'
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
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

// Images (svgs)
import add_image_icon from '~/assets/icons/image-add-line.svg'
import underline_icon from '~/assets/icons/underline.svg'
import code_snip_icon from '~/assets/icons/code-view.svg'
import double_quotes_icon from '~/assets/icons/double-quotes-r.svg'
import italic_icon from '~/assets/icons/italic.svg'
import bold_icon from '~/assets/icons/bold.svg'
import link_icon from '~/assets/icons/link.svg'
import seperator_icon from '~/assets/separator.svg'

import heading_1_icon from '~/assets/icons/h-1.svg'
import heading_2_icon from '~/assets/icons/h-2.svg'


// const emit = defineEmits()
const errorHappened = ref(null)

const editor = useEditor({
"type": "doc",
	content: '',
	extensions: [
		Heading.configure({
		levels: [1,2,3,4]
		}),
		Blockquote,
		BulletList,
		Image,
		CodeBlock,
		HardBreak,
		HorizontalRule,
		ListItem,
		OrderedList,
		Strike,
		Gapcursor,
		History,
		Dropcursor,
		Document,
		Paragraph,
		Text,
		Italic,
		Link,
		Bold,
    Code,
		Placeholder.configure({
			placeholder:'Write something ...'
		}),
		FloatingMenu,

	],
	editorProps: {
	attributes: {
	class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
	},
},
})

const emit = defineEmits()

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

// husk at hermer etter medium

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

	if (title.trim() != "" && body.trim() != "") {
	const request_body = {
		"title":title,
		"content":body,
	}
	emit('newPostMaterial', request_body)

	errorHappened.value = false
	editor.value.commands.clearContent()

} else {
	console.log("Somethign went wrong: 'body' and 'tile' either body or title had an empty value")
	errorHappened.value = true

}

	// emit to parent component

}

const cancelClick = () => {
	const router = useRouter()
	editor.value.commands.clearContent
	const place = router.go(-1)
	return navigateTo(place)
}
</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
> * + * {
	margin-top: 0.75em;
}
}

.tiptap p.is-editor-empty:first-child::before {
content: attr(data-placeholder);
float: left;
color: #adb5bd;
pointer-events: none;
height: 0;
}

</style>