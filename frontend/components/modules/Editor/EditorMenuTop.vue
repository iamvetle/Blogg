<template>
    <div>

        <div data-test="modal_for_url_link_add" v-if="showModalAddLinkURL">
            <teleport to="#modal">
                <div>
                    <EditorModalAddURLLink @confirm-adding-url="addURLModalMessage" @cancel="showModalAddLinkURL = false" />
                </div>
            </teleport>
        </div>

        <div class="flex px-3 w-full justify-between items-center flex-wrap" data-test="top_menu_wrapper">
            <!-- V-IF -->
            <div class=" flex space-x-14 items-center flex-wrap" v-if="editor"> <!-- Need v-if here-->
                <!-- BOLD, ITALIC, UNDERLINE -->
                <div id="top-three" class="flex space-x-2 items-center py-2">
                    <span class="option-holder">
                        <EditorButton @click="toggleBoldRun(editor)" data-test="bold_option" :icon="bold_icon" alt="Bold"
                            :is-active="editor.isActive('bold')" />
                    </span>
                    <span class="option-holder">
                        <EditorButton @click="toggleItalicRun(editor)" data-test="italic_option" :icon="italic_icon"
                            alt="Italic" :is-active="editor.isActive('italic')" />
                    </span>
                    <span class="option-holder">
                        <EditorButton @click="toggleUnderlineRun(editor)" data-test="underline_option"
                            :icon="underline_icon" alt="Underline" :is-active="editor.isActive('underline')" />
                    </span>
                </div>
                <!-- HEADINGS -->
                <div id="heading_options" class="flex space-x-2 items-center py-2">
                    <span class="option-holder">
                        <EditorButton data-test="heading1_option" :is-active="editor.isActive('heading', { level: 1 })"
                            @click="toggleHeadingRun(editor, 1)" :icon="heading1_icon" alt="Heading 1" />
                    </span>
                    <span class="option-holder">
                        <EditorButton data-test="heading2_option" :is-active="editor.isActive('heading', { level: 2 })"
                            @click="toggleHeadingRun(editor, 2)" :icon="heading2_icon" alt="Heading 2" />
                    </span>
                    <span class="option-holder">
                        <EditorButton data-test="heading3_option" :is-active="editor.isActive('heading', { level: 3 })"
                            @click="toggleHeadingRun(editor, 3)" :icon="heading3_icon" alt="Heading 3" />
                    </span>
                </div>
                <!-- LISTS, BULLETLIST, ORDERED LIST-->
                <div id="list-options" class="flex space-x-2 items-center py-2">
                    <span class="option-holder">
                        <EditorButton @click="toggleBulletListRun(editor)" data-test="bullet_list_option"
                            :icon="bullet_list_icon" alt="Unordered list" :is-active="editor.isActive('bulletList')" />
                    </span>
                    <span class="option-holder">
                        <EditorButton @click="toggleOrderedListRun(editor)" data-test="number_list_option"
                            :icon="number_list_icon" alt="Ordered list" :is-active="editor.isActive('orderedList')" />
                    </span>
                </div>
                <!-- Add, seperator image and Add URL - sat to false -->
                <div id="add_options" class="flex space-x-2 items-center py-2">

                    <!-- Add horizontal rule / seperator -->
                    <span class="option-holder" data-test="add_seperator">
                        <EditorButton @click="horizontalRuleRun(editor)" :icon="seperator_icon" alt="Add seperator" />
                    </span>

                    <!-- Add IMAGE -->
                    <span class="option-holder" data-test="add_image_team">
                        <EditorButton @click="handleAddImageClick" :icon="image_add_icon" alt="Add image"
                            data-test="image_option" />
                        <input @change="handleFileChange" type="file" hidden ref="addImageRef"
                            data-test="top_input_image" />
                    </span>
                    <!-- Add URL Link-->
                    <span class="option-holder" data-test="add_url_link">
                        <EditorButton @click="handleAddURLLinkClick" data-test="url_link_option" :icon="url_link_add_icon"
                            alt="Add link" :is-active="editor.isActive('link')" />
                    </span>
                </div>

                <!-- QUOTEING and CODE BLOCK-->
                <div id="codeQuote_options" class="flex space-x-2 items-center py-2">
                    <!-- BlockQuote -->
                    <span class="option-holder">
                        <EditorButton data-test="blockquote_option" :is-active="editor.isActive('blockquote')"
                            @click="toggleBlockquoteRun(editor)" :icon="blockquote_icon" alt="Blockquote" />
                    </span>
                    <span class="option-holder">
                        <EditorButton data-test="codeblock_option" :is-active="editor.isActive('codeBlock')"
                            @click="toggleCodeBlockRun(editor)" :icon="codeblock_icon" alt="Codeblock" />
                    </span>
                </div>
                <!-- UNDO and REDO -->
                <div id="undo_redo_options" class="flex space-x-2 items-center float-right py-2">
                    <!-- Undo-->
                    <span class="option-holder">
                        <EditorButton @click="setUndoRun(editor)" data-test="undo_option" :icon="go_back_icon" alt="Undo" />
                    </span>
                    <!-- Redo -->
                    <span class="option-holder ">
                        <EditorButton @click="setRedoRun(editor)" data-test="redo_option" :icon="go_forward_icon"
                            alt="Redo" />
                    </span>
                </div>
            </div>

            <div id="discard_publish_options_buttons" class="flex items-center space-x-4 py-2">
                <!-- Discard Button -->
                <span class="button-option">
                    <BaseButton id="discard" data-test="do_discard_button_option"
                        class="py-1 px-2 rounded-md text-sm cursor-pointer border border-secondary text-secondary hover:shadow-md"
                        @click="$emit('tryDiscardEditingPost')" text="Discard" />
                </span>
                <!-- Publish button-->
                <span class="button-option">
                    <BaseButton id="publish" data-test="try_publish_button_option"
                        class="py-1 px-2 rounded-md text-sm cursor-pointer border border-secondary text-onSecondary bg-secondary hover:shadow-md"
                        @click="$emit('publishPost')" text="Publish" />
                </span>
            </div>
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

import heading1_icon from '~/assets/icons/h1.svg'
import heading2_icon from '~/assets/icons/h2.svg'
import heading3_icon from '~/assets/icons/h3.svg'

import seperator_icon from '~/assets/separator.svg'


import { Editor } from '@tiptap/core';

const emit = defineEmits(["publishPost", "tryDiscardEditingPost", "addImage"])


const props = defineProps<{
    editor: Editor | undefined
}>();

/** The add url link modal for a post  */
const showModalAddLinkURL = ref(false)

const handleAddURLLinkClick = () => {

    /**
     * TODO - When I have selected a part of text that has a link to it I want the ICON to be able to indicate that for example turn red
     */

    const currentLink: any = (props.editor as Editor).getAttributes('link').href

    if (currentLink) {
        (props.editor as Editor).commands.toggleLink({ href: currentLink })
    } else {
        showModalAddLinkURL.value = true
        props.editor?.commands.focus()
    }
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

/** A template ref to the input element */
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

    // then focuses back on the editor
    props.editor?.commands.focus()
}


</script>

<style scoped></style>