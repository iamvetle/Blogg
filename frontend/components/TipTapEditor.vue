<template>
    <EditorContent :editor="editor" />
</template>
  
<script setup lang=ts>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
	content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
	extensions: [
		StarterKit,

	],
	editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
    },
  },
})

</script>