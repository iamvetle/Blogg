<template>
	<div class="p-2">
		<div id="editor-container"
			class="w-full px-[60px] pt-[35px] pb-[30px] flex flex-col rounded-lg min-h-[450px] mb-24">

			<div data-test="text_editor_modals">
				<!-- The Modal to confirm to the post -->
				<div v-if="showModalPublishPost">
					<!-- Using Nuxt UI, don't need teleport -->
					<EditorModalPublishPost @confirm="handleModalPublishPost" @abort="handleModalCancelTheDiscard" />
				</div>
				<!-- Using Nuxt UI, don't need teleport -->
				<div v-if="showModalRequirements">
					<EditorModalRequirements @close="closeModalRequirements" />
				</div>
				<!-- The Modal to discard the content post -->
				<div v-if="showModalDiscardPost">
					<EditorModalDiscardPost @discard-post="handleModalDiscardPost" @cancel="handleModalCancelTheDiscard" />
				</div>
			</div>

			<!-- Menus for editor -->
			<div data-test="menus" class="w-full not-prose mb-6" v-if="editor">
				<EditorMenuFloating :editor="editor" @add-image="handleAddImage" />

				<div class="max-w-4xl mx-auto">
					<EditorMenuTop :editor="editor" @add-image="handleAddImage" @publish-post="handlePublishPost"
						@try-discard-editing-post="handleTryDiscardEditingPost" :charCount="charCount"/>
					<hr class="not-prose mt-4 mb-8">

				</div>
			</div>


			<div data-test="editor_and_title_input" class="mt-2 w-full mx-auto">

				<!-- Input editor (not prose)-->
				<div class="max-w-2xl mx-auto">
					<InputText @keypress.enter="editor.commands.focus('start')" ref="editorTitleInputRef" placeholder="Title"
						v-model.trim="titleEditor"
						class="not-prose mx-auto pb-3 w-full border-none bg-inherit text-4xl leading-4 font-extrabold outline-none placeholder:text-gray-300 " />
				</div>

				<hr class="not-prose invisible">	

				<!-- Main Editor (has prose) -->
				<div @click="editor.commands.focus()" data-test="direct-editor" class="max-w-2xl mx-auto pt-3 w-full min-h-screen prose px-1">
					<editor-content :editor="editor" @keyup.delete="maybePlaceFocusOnEditorTitle" />
				</div>
			</div>
			<div>
			</div>
		</div>

		<hr class="mb-4 ">

	</div>
</template>

<script setup lang="ts">
/**
 * Editor for creating new posts.
 * 
 * The post that wants to be publushed is emitted upwards.
 * 
 * The post will be saved in session storage when navigating away from the page, but
 * ! not when refreshing
 * ! the images will be removed - the src code is the only thing left
 */

import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document' // required
import BulletList from '@tiptap/extension-bullet-list'
import CodeBlock from '@tiptap/extension-code-block'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Code from '@tiptap/extension-code'
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
import { Image } from './CustomImage'
import { Placeholder } from '@tiptap/extension-placeholder'

const emit = defineEmits(['newPostMaterial', 'charactersCount'])

// The state of the modals
const showModalPublishPost = ref(false)
const showModalDiscardPost = ref(false)
// The modal that makes sure the requirements are met?
const showModalRequirements = ref(false)

/** 
 * Makes sure that not two modals can exist at the same time 
 * ? what about the requirments modal?
 */
watchEffect(() => {
	if (showModalPublishPost.value) {
		showModalDiscardPost.value = false
	}
	if (showModalDiscardPost.value) {
		showModalPublishPost.value = false
	}
})

/** The form that will eventually be sent with the request */
const formData = ref(new FormData())

/** This stores the title state of the title input editor */
const titleEditor = ref("")

/** template ref for the title input */
const editorTitleInputRef = ref<any>(null)

// Object to store the mapping of unique ID and file
const imageFileMap = ref<any>({});

/** 
 * This two are just so that I can share them between 
 * the button click function and the modal publish function
 */
const title = ref<string | null | undefined>(null);
const body = ref<string | null | undefined>(null);

const editor: any = useEditor({ //@ts-ignore
	"type": "doc",
	content: '',
	extensions: [
		Heading.configure({
			levels: [1, 2, 3]
		}),
		Blockquote,
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
		Gapcursor,
		History,
		Dropcursor,
		Document,
		Paragraph,
		Text, // required
		Italic,
		Link.configure({ //@ts-ignore
			validate: href => /^https?:\/\//.test(href),
			HTMLAttributes: {
				class: ""
			}
		},

		),
		Bold,
		Underline,
		Code,
		Placeholder.configure({
			placeholder: 'Write something ...',
		})
		// Youtube,
	],

	editorProps: {
		attributes: {
			class: 'focus:outline-none',
		},
	},
})

/** Has the momentary raw text */
const contentText = computed(() => editor.value?.getText() || "")

/** Has the character count at the moment */
const charCount = computed(() => contentText.value.length)

watchEffect(() => emit("charactersCount", charCount.value))

const focusOnCorrectEditor = () => {
	/** Takes the focus to the title inpur, if there is an empty title string*/
	if (editor.value) {
		if (titleEditor.value === "") {

			/**
			 * This is the reason the focus thing didnt work initially -> editor.value.commands.blur()
			 */

			// dobbel checks 
			if (editorTitleInputRef.value) {
				(editorTitleInputRef.value as any).textInput?.focus()
			}
			// case: the title input already had some input, string value
		} else {
			editor.value.commands.focus()
		}
	}
}



/**
 * Retrieves the file that was just pasted (before it turns into base64 string)
 * and then calls a fun
 * 
 * @param event - The file that was pasted
 */
const handleImagePaste = async (event: any) => {
	const items = (event.clipboardData || event.originalEvent.clipboardData).items;

	for (const item of items) {
		if (item.type.indexOf("image") === 0) {
			const blob = item.getAsFile();
			const file = new File([blob], "pasted-image.png", { type: blob.type });

			const uniqueId = generateUniqueId(); // Function to generate a unique ID.
			const fileTempUrl = URL.createObjectURL(file);

			if (fileTempUrl) {
				// Store the file with its unique ID in the image map
				imageFileMap.value[uniqueId] = file;
				editor.value.chain().focus().setImage({ src: fileTempUrl, data: uniqueId }).createParagraphNear().run()
			}
			event.preventDefault();
		} else {
			// even if the "file" wasnt an image / nothing was pasted the focus is placed back on the editor
			editor.value.commands.focus()
			return
		}
	}
	//? puts focus on the editor. dont know where this would be called - if there was no real paste maybe?
	editor.value.commands.focus()
}

/**
 * TODO Remove the prop thing i have here
 * TODO remove the watcher that is to it
 * TODO Make it so that the height of the available writing space is not "JUST" enoguh
 * TODO Place a style on the texting so that for example the images dont eat eachother up
 * TODO Close the instance object URL i make each time i add an image
 */

/**
 * Activates the next steps to publish the post -> calls the comfirmation modal
 */
const handlePublishPost = async () => {

	// The html in string format
	const html = editor.value?.getHTML();
	// The html in raw text format
	const htmlRawText = (editor.value?.getText()) ?? "";

	// The title of the post
	const titleText = titleEditor.value ?? "";

	// if the title is literally lese than three characters
	if (titleText?.length < 3) {
		// shows the modal that shows the requirements
		showModalRequirements.value = true
		return
	}

	// if the post content is under 50
	if (htmlRawText?.length < 50) {
		showModalRequirements.value = true
		return
	}

	// Puts the html and title in their "reactive" partners
	body.value = html
	title.value = titleEditor.value

	// shows the modal that is going to ask for confirmation
	showModalPublishPost.value = true;

	return
};

const handleTryDiscardEditingPost = () => {
	const html = editor.value?.getText();
	const title = titleEditor.value
	// if there is something to discard, the discard modal is shown, else, it is not shown
	if (html || title) {
		showModalDiscardPost.value = true
	} else {
		// puts focus back on editor - there was nothing to discard
		editor.value.commands.focus()
	}
}

/**
 * Cancels the post creation, an discards all traces of it
 * 
 * * I think I have to have a regular function because I am doing "new Formdata"
 */
function handleModalDiscardPost() {

	// close the model
	showModalDiscardPost.value = false

	// Clears the input
	editor.value?.commands.clearContent();
	titleEditor.value = ""
	title.value = ""
	body.value = ""

	// When the post is discarded the current form is also discarded, or reset
	formData.value = new FormData

	// all of the pictures currently in store(cached?) are also discarded
	imageFileMap.value = {}

	// puts the focus back on the editor
	editor.value.commands.focus()
};

/** 
 * Emits an event to parent saying post should be published 
 * 
 * * Only called by modal
 */
function handleModalPublishPost() {
	console.log("publish post was called")

	showModalPublishPost.value = false;

	formData.value.append("title", title.value || "");
	formData.value.append("content", body.value || "");

	imageFileMap.value = validateAndCleanImageMap(body.value, imageFileMap.value)

	// Append each file with its unique ID
	for (let id in imageFileMap.value) {
		let file = imageFileMap.value[id];
		formData.value.append(`image_${id}`, file, `image_${id}_${file.name}`);
	}

	// Tells the parents component that the post can be published
	emit('newPostMaterial', formData.value);

	editor.value?.commands.clearContent();
	titleEditor.value = ""
	title.value = ""
	body.value = ""

	// Removes all currently stored images and their ids
	imageFileMap.value = {}

	// Creates a new formData object
	formData.value = new FormData()

	// puts the focus back on the editor
	editor.value.commands.focus()
};

/** The cancel button of the discard modal was pressed */
const handleModalCancelTheDiscard = () => {
	// Closes all modals (makes sure)
	showModalDiscardPost.value = false;
	showModalPublishPost.value = false

	// places focus back on editor
	editor.value.commands.focus()
};

const closeModalRequirements = () => {
	showModalRequirements.value = false
	focusOnCorrectEditor()
}

/**
 * Handles the process when an image is added through file input
 * 
 * @param event - The image file
 */
const handleAddImage = (event: any) => {
	console.log("start of handle add Image change")
	if (event) {
		const file = event.target.files[0];
		const uniqueId = generateUniqueId(); // Function to generate a unique ID.
		const fileTempUrl = URL.createObjectURL(file);
		console.log("middle of handleaddimage")


		if (fileTempUrl) {
			// Store the file with its unique ID in the map
			imageFileMap.value[uniqueId] = file;
			console.log(" imagefilemap.value[uniqueid] has been declared  last  of handle add Image change") // print to self
			console.log(uniqueId, fileTempUrl)

			editor.value.chain().focus().setImage({ src: fileTempUrl, data: uniqueId }).createParagraphNear().run()

			// places focus back on editor
			editor.value.commands.focus()

			return
		}
	} else {
		// even if the "file" wasnt an image / nothing was pasted the focus is placed back on the editor
		// ? dont see how this would happen though
		editor.value.commands.focus()
	}
}

/** Listens for "paste" events */
onMounted(() => {
	if (editor.value) {
		editor.value.view.dom.addEventListener('paste', handleImagePaste);
	}
})

/** Initiallices the editor / makes it ready to start */
onMounted(() => {
	// If the editor instance has started
	if (editor.value) {

		// gets the html from stored in sessionStorage (or empty string)
		const htmlPost = (sessionStorage.getItem("htmlPost")) ?? ""
		// inserts the html into the documented
		editor.value.commands.setContent(htmlPost)

		// gets the title string from the sessionStorage and inserts it into the input title.value (or empty string)
		titleEditor.value = (sessionStorage.getItem("titlePost")) ?? ""

		// focus on the correct editor
		focusOnCorrectEditor()
	}
})

/** reactive constant that makes the computed above work */
const htmlForComputed = ref<string | null | undefined>(null);

/** Controls if the editor is empty, and has a computed variable that tell true or false to that  */
const isEditorEmpty = computed(() => {
	htmlForComputed.value = editor.value.getHTML()
	console.log(htmlForComputed.value) // print to self
	if (htmlForComputed.value?.trim() === "<p></p>") {
		return true
	} else {
		return false
	}
})

/** 
 * If there is not content then this function is properly executed 
 * 
 * It is continuesly called by the keyup.delete on the editor
 * 
*/
const maybePlaceFocusOnEditorTitle = () => {
	if (isEditorEmpty.value === true) {
		if (editorTitleInputRef.value) {
			(editorTitleInputRef.value as any).textInput?.focus()
		}
	}
}

/**
 * Saves to sessionStorage:
 * - html content
 * - title string
 * 
 * ! it will never, and I will never (as far as I know) be able to save
 * ! a session when someone refreshes
 */
onUnmounted(() => {
	// gets the html from the post
	const htmlPostWithImg = editor.value?.getHTML()

	// removes the img elements if there are any
	const htmlPost = removeImgTags(htmlPostWithImg)

	// gets the title from the input
	const titlePost = titleEditor.value

	// Not supposed to happen
	if (editor.value.isDestroyed != true) {
		console.log("not destroyed")
		editor.value.destroy()
	}

	// Saves the html content in a session for storing
	sessionStorage.setItem("htmlPost", htmlPost)
	// Saves the title string in a session for storing
	sessionStorage.setItem("titlePost", titlePost)
})

</script>

<style lang="scss">
/** SASS */
.tiptap p.is-editor-empty:first-child::before {
	content: attr(data-placeholder);
	float: left;
	color: #adb5bd;
	pointer-events: none;
	height: 0;
}
</style>