<template>
    <div v-if="editor">
        <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }"
            class="not-prose space-x-3 flex items-center rounded-md border p-1 bg-plain shadow-md">

            <EditorButton :is-active="editor.isActive('bold')" @button-click="toggleBold(editor)" :icon="bold_icon" alt="bold" />

            <EditorButton :is-active="editor.isActive('italic')" @button-click="toggleItalic(editor)" :icon="italic_icon"
                alt="italic" />

            <EditorButton :is-active="editor.isActive('underline')" @button-click="toggleUnderline(editor)" :icon="underline_icon"
                alt="underline" />

            <EditorButton :is-active="editor.isActive('code')" @button-click="toggleCode(editor)" :icon="code_snip_icon"
                alt="code" />

            <EditorButton :is-active="editor.isActive('blockquote')" @button-click="toggleBlockquote(editor)"
                :icon="double_quotes_icon" alt="blockquote" />
        </bubble-menu>
    </div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3';

// Icons

import underline_icon from '~/assets/icons/underline.svg'
import code_snip_icon from '~/assets/icons/code-view.svg'
import double_quotes_icon from '~/assets/icons/double-quotes-r.svg'
import italic_icon from '~/assets/icons/italic.svg'
import bold_icon from '~/assets/icons/bold.svg'


defineProps<{
    editor: Editor | undefined
}>();

const toggleUnderline = (editor:any) => {
	editor.chain().focus().toggleUnderline().run()
}

const toggleCode = (editor:any) => {
	editor.chain().focus().toggleCode().run()
}

const toggleBlockquote = (editor:any) => {
	editor.chain().focus().toggleBlockquote().run()

}

const toggleBold = (editor:any) => {
	editor.chain().focus().toggleBold().run()
}

const toggleItalic = (editor:any) => {
	editor.chain().focus().toggleItalic().run()
}

</script>

<style scoped></style>