<template>
	<div class="p-2">
		<div id="editor-container"
			class="w-full px-[60px] pt-[35px] pb-[30px] bg-background flex flex-col text-gray-800 rounded-lg min-h-[450px] mb-12">

			<div v-if="showModal">
				<teleport to="#modal">
					<div class="w-full absolute blur-sm">
						<EditorModalPublishPost @confirm="publishPost" @abort="cancelPublishing" />
					</div>
				</teleport>
			</div>

			<!-- Editor menus -->
			<div class="w-full not-prose mb-6">
				<!-- I have to do v-if because useEditor() can be undefined -->
				<EditorFloatingMenu v-if="editor" :editor="editor"
					class="bg-surface md:visible hidden relative p-1 shadow-md rounded-md border not-prose md:-left-[275px]"
					@add-image="handleAddImageChange" @cancel-making-post="buttonCancelClick"
					@try-publish-post="buttonTryPublishClick" />

				<EditorCardTopMenu :editor="editor" @add-image="handleAddImageChange"
					@try-publish-post="buttonTryPublishClick" @cancel-editing-post="buttonCancelClick" />
			</div>

			<hr class="not-prose mb-8">

			<div data-test="editor_title_input" class="mt-2 max-w-2xl w-full mx-auto">

				<!-- Title editor -->
				<InputText @keypress.enter="editor.commands.focus()" autofocus placeholder="Title"
					v-model.trim="titleEditor"
					class="not-prose pb-3 border-none bg-inherit w-full text-4xl leading-4 font-extrabold outline-none placeholder:text-gray-300 " />

				<hr class="not-prose invisible">

				<!-- Editor -->
				<div @click="editor.commands.focus()" data-test="direct-editor" class="pt-3 w-full min-h-[500px] ">
					<editor-content :editor="editor" />
				</div>

			</div>

		</div>

		<hr class="mb-4 ">

	</div>
	<div>

	</div>
</template>

<script setup lang="ts">

//  class="flex flex-row justify-center items-center"

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
import Image from '@tiptap/extension-image'

const emit = defineEmits(['newPostMaterial'])

/**
 * ! I am curently customizing the
 * * <a></a>
 * ! element through the main css. That is just temporary - remove later
 */

/**
 * This variable dictates whether the Modal is shown or not.
 * 
 * True: Modal is shown. 
 * False: Modal is hidden.
*/
const showModal = ref(false)

const formData = ref(new FormData())

/** This just stores all of the writte html as a string and gets regularly updated */
const html = ref<string | null | undefined>(null);

/** This stores the title of the title input editor */
const titleEditor = ref("")

// const route = useRoute()

const imageFileMap = ref<any>({}); // Object to store the mapping of unique ID and file

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
		}),
		Bold,
		Underline,
		Code,
		// Placeholder later on
		// Youtube,
	],

	editorProps: {

		attributes: {
			class: 'focus:outline-none not-prose',
			// class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',	
		},
	},
})

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
				editor.value.chain().focus().setImage({ src: fileTempUrl, alt: uniqueId }).run()
			}
			event.preventDefault();
		}
	}
}




/**
 * Tracks the "emptyness" of the editor
 */
// const isEditorEmpty = computed(() => !editor.value?.content?.trim());

// /**
//  * On update it takes and updates the HTML value?
//  */
// onMounted(() => {
// 	/**
// 	 * ? Not sure how this works. Each time the component updates the html updates?
// 	 */
// 	editor.value?.on("update", () => {
// 		html.value = editor.value?.getHTML();
// 	});
// });


// BUTTON ACTIONS

/**
 * Activates the next steps to publish the post -> calls the comfirmation modal
 */
const buttonTryPublishClick = async () => {
	html.value = editor.value?.getHTML();

	// -> old ->
	// const answer = extractTitleAndContent(html.value as string);

	// title.value = answer?.title;
	// body.value = answer?.body;
	// <--

	body.value = html.value
	title.value = titleEditor.value

	if (!title.value || !body.value) {
		alert("Invalid post content");
		return;
	}
	showModal.value = true;
};

/**
 * Cancels the post creation and navigates to the feed(home) page.
 */
const buttonCancelClick = () => {
	const router = useRouter();

	// Clears the input
	editor.value?.commands.clearContent();
	titleEditor.value = ""
	title.value = ""
	body.value = ""
	router.push('/');
};

/** 
 * Emits an event to parent saying post should be published 
 * 
 * * Only called by modal
 */
const publishPost = () => {
	console.log("publish post was called")

	showModal.value = false;

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

	editor.value?.chain().focus().clearContent().run();
	titleEditor.value = ""

	// Removes all currently stored images and their ids
	imageFileMap.value = {}

	// Creates a new formData object
	formData.value = new FormData()
};

/**
 * Cancels publishing
 * * Called by the modal
 */
const cancelPublishing = () => {
	showModal.value = false;
};

/**
 * Handles the process when an image is added through file input
 * 
 * @param event - The image file
 */
const handleAddImageChange = (event: any) => {
	console.log("start of handle add Image change")
	if (event) {
		const file = event.target.files[0];
		const uniqueId = generateUniqueId(); // Function to generate a unique ID.
		const fileTempUrl = URL.createObjectURL(file);
		console.log("middle of handleaddimagechange")


		if (fileTempUrl) {
			// Store the file with its unique ID in the map
			imageFileMap.value[uniqueId] = file;
			console.log(" imagefilemap.value[uniqueid] has been declared  last  of handle add Image change")
			console.log(uniqueId, fileTempUrl)


			editor.value.chain().focus().setImage({ src: fileTempUrl, alt: uniqueId }).run()
		}
	}
}

onMounted(() => {
	// If the editor instance has started
	if (editor.value) {

		// paste handler?
		editor.value.view.dom.addEventListener('paste', handleImagePaste);


		// gets the html from stored in sessionStorage (or empty string)
		const htmlPost = (sessionStorage.getItem("htmlPost")) ?? ""
		// inserts the html into the documented
		editor.value.commands.setContent(htmlPost)

		// gets the title string from the sessionStorage and inserts it into the input title.value (or empty string)
		titleEditor.value = (sessionStorage.getItem("titlePost")) ?? ""

		// If not title input has been writen, put focus on the title input (else, skip)
		if (titleEditor.value === "") {
			// takes the focus away from the main editor
			editor.value.commands.blur()
			
			
			// places the focus on the title input instead 
			// if (editorTitleInput.value) {
			// 	editorTitleInput.value.focus()
			// }

			// if the title has a string put the focus on the main editor
		} else {
			editor.value.commands.focus()
		}

		/**
		 * * Not using(not implemented) yet
		 */
		// If the route is /edit/ it wont retrieve cached halway done post ?
		// if (route.path.includes("edit") === false) {
		// }
	}
})



/**
 * Saves to sessionStorage:
 * - html content
 * - title string
 */
onUnmounted(() => {
	// gets the html from the post
	const htmlPost = editor.value?.getHTML()

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

<style scoped></style>