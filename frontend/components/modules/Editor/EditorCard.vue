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
				<EditorFloatingMenu :editor="editor" @add-image="handleAddImageChange"/>

				<!-- <EditorBubbleMenu
				:editor="editor"
				/> -->
				<EditorCardTopMenu :editor="editor"/>
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
// import { BubbleMenu } from '@tiptap/vue-3';
import Document from '@tiptap/extension-document' // required
import BulletList from '@tiptap/extension-bullet-list'
import CodeBlock from '@tiptap/extension-code-block'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Code from '@tiptap/extension-code'
// import Strike from '@tiptap/extension-strike'
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


// const errorHappened = ref(null)

/**
 * This variable dictates whether the Modal is shown or not.
 * 
 * True: Modal is shown. 
 * False: Modal is hidden.
*/
const showModal = ref(false)
const html = ref<string | null | undefined>(null);
const route = useRoute()

const imageFileMap = ref<any>({}); // Object to store the mapping of unique ID and file


/** This two are just so that I can share them between the button 
 * click function and the modal publish function*/
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
		// Subscript,
		// Placeholder.configure({
		// 	placeholder: '123',
		// 	showOnlyWhenEditable: false,
		// 	includeChildren: true,	
		// 	showOnlyCurrent: false
		// }),
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
		// Superscript,
		// Subscript,
		// Strike,
		Gapcursor,
		// Table.configure({
		// 	resizable: true,
		// }),
		// TableRow,
		// TableHeader,
		// TableCell,
		History,
		// Youtube.configure({
		// nocookie: true,
		// }),
		Dropcursor,
		Document,
		Paragraph,
		Text, // required
		// TaskList,
		// TaskItem.configure({
		// nested: true,
		// }),
		Italic,
		Link.configure({ //@ts-ignore
			validate: href => /^https?:\/\//.test(href),
		}),
		Bold,
		Underline,
		Code,
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

const unwatch = watch(() => props.initialPost, (newPost) => {
	if (newPost) {
		editor.value.commands.setContent(newPost);
		unwatch(); // Unwatch after the first trigger
	}
}, {
	immediate: false // This will ensure the watcher doesn't trigger on initial setup
});

/**
 * Tracks the "emptyness" of the editor
 */
// const isEditorEmpty = computed(() => !editor.value?.content?.trim());

/**
 * On update it takes and updates the HTML value?
 */
onMounted(() => {
	editor.value?.on("update", () => {
		html.value = editor.value?.getHTML();
	});
});

const formData = ref(new FormData())

// BUTTON ACTIONS

/**
 * Tries to publish the post. First, extracts the title and content and then
 * shows a modal for confirmation.
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

function removeImageFromMap(uniqueId:any) {
    // Check if the image with the given ID exists in the map
    if (imageFileMap.value.hasOwnProperty(uniqueId)) {
        delete imageFileMap.value[uniqueId]; // Remove the image from the map
        console.log(`Image with ID ${uniqueId} has been removed from the map.`);
    } else {
        console.log(`No image found with ID ${uniqueId}.`);
    }
}

const validateAndCleanImageMap = (htmlContent:any) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlContent, 'text/html');
    let imagesInContent = doc.querySelectorAll('img');

    // Create a set of all image IDs present in the HTML content
    let imageIdsInContent = new Set();
    imagesInContent.forEach(img => {
        let imageId = img.getAttribute('alt'); // Assuming 'alt' is used for storing the image ID
        if (imageId) {
            imageIdsInContent.add(imageId);
        }
    });

    // Iterate over the keys in imageFileMap
    Object.keys(imageFileMap.value).forEach(imageId => {
        // Check if the image ID is not present in the HTML content
        if (!imageIdsInContent.has(imageId)) {
            // Remove the image from imageFileMap as it's not in the editor
            removeImageFromMap(imageId);
            console.log(`Image with ID ${imageId} has been removed from imageFileMap.`);
        }
    });
}



// MODAL EMITS/EVENTS 2/2

/** The modal can return TWO things */

// 1/2

/** 
 * Button action
 * 
 * Emits the new post data and clears the editor content.
 * 
 * ! Problemet mitt er at jeg ikke vet hvordan jeg skal legge til IMAGE(S) sammen med TITLE og BODY/CONTENT
 * ! OG
 * ! Hvordan jeg skal kommunisere mellom editor floating menu og editor card
 * * akk nå tror jeg at editorfloating bare sender en emit sammen med event(eller ikek?) opp til denne componentetn
 * 
 * * Only called by modal
 */
const publishPost = () => {
	console.log("publish post was called")


	showModal.value = false;
	generalStore.turnBackgroundForModel(null);

	formData.value.append("title", title.value || "");
	formData.value.append("content", body.value || "");

	validateAndCleanImageMap(body.value)

	console.log("validateimagesincontent is supposed to have been alled now")


	// Append each file with its unique ID
	for (let id in imageFileMap.value) {
        let file = imageFileMap.value[id];
        formData.value.append(`image_${id}`, file, `image_${id}_${file.name}`);
    }

	emit('newPostMaterial', formData.value);


	editor.value?.chain().focus().clearContent().run();
	imageFileMap.value = {}

	// removes everything anbd starts new
	formData.value = new FormData()
};

// 2/2
/**
 * Cancels publishing and resets the modal state.
 */
const cancelPublishing = () => {
	showModal.value = false;
	generalStore.turnBackgroundForModel(null);
};


/** METHODS FOR THE EDITOR */

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
 * This saves the content into sessionstorage
 */
onUnmounted(() => {
	/** 
 * Retrieves the text that has been written in the 
 * text editor, as HTML.
 */
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