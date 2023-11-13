<template>
    <div id="top-menu-container" v-if="editor" class="flex space-x-10 w-full">
        <div id="top-three" class="flex space-x-2">
            <span class="option-holder">
                <EditorButton @click="toggleBold(editor)" data-test="bold_option" :icon="bold_icon" alt="Bold" :is-active="editor.isActive('bold')"/>
            </span>
            <span class="option-holder">
                <EditorButton @click="toggleItalic(editor)" data-test="italic_option" :icon="italic_icon" alt="Italic" :is-active="editor.isActive('italic')" />
            </span>
            <span class="option-holder">
                <EditorButton @click="toggleUnderline(editor)" data-test="underline_option" :icon="underline_icon" alt="Underline" :is-active="editor.isActive('underline')" />
            </span>
        </div>
        <div id="list-options" class="flex space-x-2">
            <span class="option-holder">
                <EditorButton @click="toggleBulletList(editor)" data-test="bullet_list_option" :icon="bullet_list_icon" alt="Unordered list" :is-active="editor.isActive('bulletList')" />
            </span>
            <span class="option-holder">
                <EditorButton @click="toggleOrderedList(editor)" data-test="number_list_option" :icon="number_list_icon" alt="Ordered list" :is-active="editor.isActive('orderedList')"/>
            </span>
        </div>
        <div id="add_options" class="flex space-x-2">
            <span class="option-holder">
                <EditorButton @click="add_image_handle" data-test="image_option" :icon="image_add_icon" alt="Add image"
                />
            </span>
            
            <span class="option-holder">
                <EditorButton @click="add_url_link_handle" data-test="url_link_option" :icon="url_link_add_icon" alt="Add hyperlink" :is-active="editor.isActive('link')"
                />
            </span>
        </div>
        <div id="undo_redo_options" class="flex space-x-2">
            <span class="option-holder">
                <EditorButton @click="setUndo(editor)" data-test="undo_option" :icon="go_back_icon" alt="Undo"
                />
            </span>
            <span class="option-holder ">
                <EditorButton @click="setRedo(editor)" data-test="redo_option" :icon="go_forward_icon" alt="Redo"
                />
            </span>
        </div>
        <div id="codeQuote_options" class="flex space-x-2">
            <span class="option-holder">
                <EditorButton data-test="blockquote_option" :is-active="editor.isActive('blockquote')" @click="toggleBlockquote(editor)"
                :icon="blockquote_icon" alt="Blockquote"/>
            </span>
            <span class="option-holder">
                <EditorButton data-test="codeblock_option" :is-active="editor.isActive('codeBlock')" @click="toggleCodeBlock(editor)"
                :icon="codeblock_icon" alt="Codeblock" />
            </span>
        </div>
        
    </div>
</template>

<script setup lang="ts">

import underline_icon from '~/assets/icons/underline.svg'
import italic_icon from '~/assets/icons/italic.svg'
import bold_icon from '~/assets/icons/bold.svg'
import bullet_list_icon from '~/assets/icons/bullet_list.svg';
import number_list_icon from '~/assets/icons/number_list.svg'
import image_add_icon from '~/assets/icons/image-add-line.svg'
import url_link_add_icon from '~/assets/icons/link_add.svg'
import go_back_icon from '~/assets/icons/go_back_icon.svg'
import go_forward_icon from '~/assets/icons/go_forward_icon.svg'
import blockquote_icon from '~/assets/icons/double-quotes-r.svg'
import codeblock_icon from '~/assets/icons/codeblock_icon.svg'

import { Editor } from '@tiptap/core';

defineProps<{
  editor: Editor | undefined
}>();

const add_image_handle = () => {
    return null
}

const add_url_link_handle = () => {
    return null
}

const toggleBold = (editor:any) => {
	editor.chain().focus().toggleBold().run()
}

const toggleItalic = (editor:any) => {
	editor.chain().focus().toggleItalic().run()
}

// const toggleHeading = (level) => {
// 	editor.value.chain().focus().toggleHeading({ level }).run();
// };

// const horizontalRule = () => {
// 	editor.value.chain().focus().setHorizontalRule().run()
// };

const toggleUnderline = (editor:any) => {
	editor.chain().focus().toggleUnderline().run()
}

const toggleBulletList = (editor:any) => {
    return editor.chain().focus().toggleBulletList().run()
}

const toggleOrderedList = (editor:any) => {
    return editor.chain().focus().toggleOrderedList().run()
}

const setUndo = (editor:any) => {
    return editor.chain().focus().undo().run()
}

const setRedo = (editor:any) => {
    return editor.chain().focus().redo().run()
}

// const toggleCode = () => {
// 	editor.value.chain().focus().toggleCode().run()
// }

const toggleBlockquote = (editor:any) => {
	editor.chain().focus().toggleBlockquote().run()
}

const toggleCodeBlock = (editor:any) => {
    editor.chain().focus().toggleCodeBlock().run()
}

// const toggleBold = () => {
// 	editor.value.chain().focus().toggleBold().run()
// }



</script>

<style scoped></style>