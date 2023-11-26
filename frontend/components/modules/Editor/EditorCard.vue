<template>
	<div class="p-2" v-if="editor">
		<div id="editor-container"
			class="w-full px-[60px] pt-[35px] pb-[30px] bg-white flex flex-col text-gray-800 rounded-lg min-h-[450px] mb-12"
			@click="editor.commands.focus()">

			<div v-if="showModal">
				<teleport to="#modal">
					<div class="w-full h-screen blur-sm">
						<Modal @confirm-published="publishPost" @cancel-published="cancelPublishing" />
					</div>
				</teleport>
			</div>

			<div class="w-full not-prose mb-6">
				<EditorFloatingMenu :editor="editor" @add-image="handleAddImageChange" />

				<EditorCardTopMenu :editor="editor" />
			</div>

			<hr class="not-prose mb-8">

			<div data-test="direct-editor" class="w-full">
				<editor-content :editor="editor" />
			</div>

		</div>

		<hr class="mb-4">

		<div data-test="cancel_publish_buttons" class="buttons flex">

			<BaseButton id="cancel"
				class="btn border border-secondary-low p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-gray-400 hover:border-secondary-base ml-auto"
				@click="buttonCancelClick" text="Cancel" />
			<BaseButton id="publish"
				class="btn border border-indigo-base p-1 px-4 font-semibold cursor-pointer text-plain ml-2 bg-secondary-base hover:bg-secondary-low"
				@click="buttonTryPublishClick" text="Publish" />

		</div>
	</div>
</template>

<script setup lang="ts">

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

import { useGeneralStore } from '~/store/generalStore';

const generalStore = useGeneralStore()
const emit = defineEmits(['newPostMaterial'])

const props = defineProps<{
	initialPost?: string;
}>();

/**
 * This variable dictates whether the Modal is shown or not.
 * 
 * True: Modal is shown. 
 * False: Modal is hidden.
*/
const showModal = ref(false)

/** This just stores all of the writte html as a string and gets regularly updated */
const html = ref<string | null | undefined>(null);
const route = useRoute()

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
			class: 'focus:outline-none',
			// class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',	
		},
	},
	autofocus: true
})

/**
 * The watcher works as a "one-time" event. It fires once
 */
const unwatch = watch(() => props.initialPost, (newPost) => {
	if (newPost) {
		editor.value.commands.setContent(newPost);
		unwatch(); // Unwatch after the first trigger
	}
}, {
	immediate: false // ? This will ensure the watcher doesn't trigger on initial setup
});


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

/**
 * On update it takes and updates the HTML value?
 */
onMounted(() => {
	/**
	 * ? Not sure how this works. Each time the component updates the html updates?
	 */
	editor.value?.on("update", () => {
		html.value = editor.value?.getHTML();
	});
});

onMounted(() => {
	editor.value.view.dom.addEventListener('paste', handleImagePaste);
})

const formData = ref(new FormData())

// BUTTON ACTIONS

/**
 * Activates the next steps to publish the post -> calls the comfirmation modal
 */
const buttonTryPublishClick = async () => {
	html.value = editor.value?.getHTML();
	const answer = extractTitleAndContent(html.value as string);

	title.value = answer?.title;
	body.value = answer?.body;

	if (!title.value || !body.value) {
		alert("Invalid post content");
		return;
	}
	showModal.value = true;
	generalStore.turnBackgroundForModel("blur-sm");
};

/**
 * Cancels the post creation and navigates to the feed(home) page.
 */
const buttonCancelClick = () => {
	const router = useRouter();
	// Clears the input
	editor.value?.commands.clearContent();
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
	generalStore.turnBackgroundForModel(null);

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
	generalStore.turnBackgroundForModel(null);
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


/**
 * Fils the content if there is a post content inside of sessionstorage
 * ? what is this
 */
onMounted(() => {
	if (editor) {

		// If the route is /edit/ it wont retrieve cached halway done post

		if (route.path.includes("edit") === false) {
			const htmlPost = sessionStorage.getItem("htmlPost")

			if (htmlPost) {
				editor.value.chain().focus().insertContent(htmlPost).run()
			}
		}
	}
})

/**
 * Saves the content of the post to sessionStorage
 */
onUnmounted(() => {
	const htmlPost = editor.value?.getHTML()

	sessionStorage.setItem("htmlPost", htmlPost)
})





</script>

<style scoped>
.editor-placeholder {
	color: grey;
	font-style: italic;
	/* Additional styling as needed */
}
</style>