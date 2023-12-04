<template>
    <div id="top-menu-container" class="flex w-full justify-between items-center flex-wrap">

        <!-- MODELS = LINK ADD, DISCARD POST -->
        <div data-test="modal_for_url_link_add" v-if="showModalAddLinkURL">
            <teleport to="#modal">
                <div>
                    <EditorModalAddURLLink @confirm-adding-url="addURL" @cancel="showModalAddLinkURL = false"/>
                </div>
            </teleport>
        </div>
        <div data-test="modal_for_url_discard_post" v-if="showModalDiscardPost">
            <teleport to="#modal">
                <div>
                    <EditorModalDiscardPost @discard-post="discardPost" @cancel="showModalDiscardPost = false"/>
                </div>
            </teleport>
        </div>

        <!-- V-IF -->
        <div class="flex space-x-10 items-center flex-wrap" v-if="editor">

            <!-- BOLD, ITALIC, UNDERLINE -->
            <div id="top-three" class="flex space-x-2 items-center py-2">
                <span class="option-holder">
                    <EditorButton @click="toggleBold(editor)" data-test="bold_option" :icon="bold_icon" alt="Bold"
                        :is-active="editor.isActive('bold')" />
                </span>
                <span class="option-holder">
                    <EditorButton @click="toggleItalic(editor)" data-test="italic_option" :icon="italic_icon" alt="Italic"
                        :is-active="editor.isActive('italic')" />
                </span>
                <span class="option-holder">
                    <EditorButton @click="toggleUnderline(editor)" data-test="underline_option" :icon="underline_icon"
                        alt="Underline" :is-active="editor.isActive('underline')" />
                </span>
            </div>

            <!-- HEADINGS -->
            <div id="heading_options" class="flex space-x-2 items-center py-2">
                <span class="option-holder">
                    <EditorButton data-test="heading1_option" :is-active="editor.isActive('heading', { level: 1 })"
                        @click="toggleHeading(editor, 1)" :icon="heading1_icon" alt="Heading 1" />
                </span>
                <span class="option-holder">
                    <EditorButton data-test="heading2_option" :is-active="editor.isActive('heading', { level: 2 })"
                        @click="toggleHeading(editor, 2)" :icon="heading2_icon" alt="Heading 2" />
                </span>
                <span class="option-holder">
                    <EditorButton data-test="heading3_option" :is-active="editor.isActive('heading', { level: 3 })"
                        @click="toggleHeading(editor, 3)" :icon="heading3_icon" alt="Heading 3" />
                </span>
            </div>

            <!-- LISTS, BULLETLIST, ORDERED LIST-->
            <div id="list-options" class="flex space-x-2 items-center py-2">
                <span class="option-holder">
                    <EditorButton @click="toggleBulletList(editor)" data-test="bullet_list_option" :icon="bullet_list_icon"
                        alt="Unordered list" :is-active="editor.isActive('bulletList')" />
                </span>
                <span class="option-holder">
                    <EditorButton @click="toggleOrderedList(editor)" data-test="number_list_option" :icon="number_list_icon"
                        alt="Ordered list" :is-active="editor.isActive('orderedList')" />
                </span>
            </div>


            <!-- Add image and Add URL - sat to false -->
            <div id="add_options" class="flex space-x-2 items-center py-2">

                <!-- Add IMAGE -->
                <span class="option-holder" data-test="add_image_team">
                    <EditorButton @click="handleAddImageClick" :icon="image_add_icon" alt="Add image"
                        data-test="image_option" />
                    <input @change="handleFileChange" type="file" hidden ref="addImageRef" data-test="top_input_image" />
                </span>

                    <!-- Add URL Link-->
                <span class="option-holder">
                    <EditorButton @click="add_url_link_handle" data-test="url_link_option" :icon="url_link_add_icon"
                        alt="Add link" :is-active="editor.isActive('link')" />
                </span>

            </div>
            <!-- QUOTEING and CODE BLOCK-->
            <div id="codeQuote_options" class="flex space-x-2 items-center py-2">

                <!-- BlockQuote -->
                <span class="option-holder">
                    <EditorButton data-test="blockquote_option" :is-active="editor.isActive('blockquote')"
                        @click="toggleBlockquote(editor)" :icon="blockquote_icon" alt="Blockquote" />
                </span>
                <span class="option-holder">
                    <EditorButton data-test="codeblock_option" :is-active="editor.isActive('codeBlock')"
                        @click="toggleCodeBlock(editor)" :icon="codeblock_icon" alt="Codeblock" />
                </span>
            </div>

            <!-- UNDO and REDO -->
            <div id="undo_redo_options" class="flex space-x-2 items-center float-right py-2">

                <!-- Undo-->
                <span class="option-holder">
                    <EditorButton @click="setUndo(editor)" data-test="undo_option" :icon="go_back_icon" alt="Undo" />
                </span>

                <!-- Redo -->
                <span class="option-holder ">
                    <EditorButton @click="setRedo(editor)" data-test="redo_option" :icon="go_forward_icon" alt="Redo" />
                </span>
            </div>
        </div>


        <!-- DIscard and publish buttons-->
        <div id="discard_publish_options_buttons" class="flex items-center space-x-4 py-2">

            <!-- Discard Button -->
            <span class="button-option">
                <BaseButton id="discard" data-test="do_discard_button_option"
                    class="py-1 px-2 rounded-md text-sm cursor-pointer border border-secondary text-secondary hover:shadow-md"
                    @click="discardEditingPostButton" text="Discard" />
            </span>

            <!-- Publish button-->
            <span class="button-option">
                <BaseButton id="publish" data-test="try_publish_button_option"
                    class="py-1 px-2 rounded-md text-sm cursor-pointer border border-secondary text-onSecondary bg-secondary hover:shadow-md"
                    @click="$emit('tryPublishPost')" text="Publish" />
            </span>
        </div>

    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["tryPublishPost", "discardEditingPost", "addImage"])

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



import { Editor } from '@tiptap/core';

/** The add url link modal for a post  */
const showModalAddLinkURL = ref(false)

/** The discard modal for discarding a post */
const showModalDiscardPost = ref(false)

const props = defineProps<{
    editor: Editor | undefined
}>();

const add_url_link_handle = () => {
    showModalAddLinkURL.value = true
}

/**
 * MODAL CALLED
 * 
 * The add link modal calls this function after confirmation 
 * 
 * @param event - the link/string from the modal
 */
const addURL = (URL: string) => {

    (props.editor as Editor).chain().focus().insertContent("asdasda").setLink({ href: URL, target: '_blank' }).run()
    showModalAddLinkURL.value = false
}

/**
 * MODAL CALLED
 * 
 * Discards the post
 */
const discardPost = () => {
    showModalDiscardPost.value = false
    emit("discardEditingPost")
}

/** 
 * BUTTON CALLED
 * 
 * Called by the button 
 * */
const discardEditingPostButton = () => {
    showModalDiscardPost.value = true
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

<style scoped></style>