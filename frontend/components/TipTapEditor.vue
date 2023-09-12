<template>
    <div id="editor-container">
      <div id="editor-area">

        <floating-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor"
        class="floating-menu absolute z-10 bg-white shadow-lg rounded-lg p-2 space-x-2"

>
        </floating-menu>
        <bubble-menu
        :editor="editor"
        :tippy-options=" { duration: 100 }"
        v-if="editor"
        class="bg-black"
        >
        <button @click="editor.addCommands" :class="{ 'is-active': editor.isActive('bold')}"
        class="mx-1 border text-white"
        >Bold</button>

        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic')}"
        class="me-1 border text-white"
        >Italic</button>

        <button @click="setLink()" :class="{ 'is-active': editor.isActive('link')}"
        class="me-1 border text-white"
        >link</button>

        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"        
        class="me-1 border text-white"
        >H3</button>

        <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"        
        class="me-1 border text-white"
        >H4</button>

        <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }"        
        class="me-1 border text-white"
        >Quote</button>
        




        </bubble-menu>
        <editor-content :editor="editor" />
      </div>
      <pre><code>{{ html }}</code></pre>
    </div>
</template>
  
<script setup>
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Blockquote from '@tiptap/extension-blockquote'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import { mount } from '@vue/test-utils';

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
    FloatingMenu,
    Link.configure({
      autolink: true,
      linkOnPaste: true,
      openOnClick: true,
      autolink: true,
    })

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