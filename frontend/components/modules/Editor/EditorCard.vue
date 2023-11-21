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
				<EditorFloatingMenu :editor="editor" @addImage="addImage" @setLink="setLink"
					@toggleHeading1="toggleHeading(1)" @toggleHeading2="toggleHeading(2)"
					@setHorizontalRule="horizontalRule" />

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

// MODAL EMITS/EVENTS 2/2

/** The modal can return TWO things */

// 1/2

/** 
 * Button action
 * 
 * Emits the new post data and clears the editor content.
 * 
 * * Only called by modal
 */
const publishPost = () => {
	showModal.value = false;
	generalStore.turnBackgroundForModel(null);
	emit('newPostMaterial', { title: title.value, content: body.value });
	editor.value?.chain().focus().clearContent().run();
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

function addImage() {
	const url = window.prompt('URL')

	if (url) {
		editor.value.chain().focus().setImage({ src: url }).run()
	}
}

const toggleHeading = (level: number) => {
	editor.value.chain().focus().toggleHeading({ level }).run();
};

const horizontalRule = () => {
	editor.value.chain().focus().setHorizontalRule().run()
};

// const toggleUnderline = () => {
// 	editor.value.chain().focus().toggleUnderline().run()
// }

// const toggleCode = () => {
// 	editor.value.chain().focus().toggleCode().run()
// }

// const toggleBlockquote = () => {
// 	editor.value.chain().focus().toggleBlockquote().run()

// }

// const toggleBold = () => {
// 	editor.value.chain().focus().toggleBold().run()
// }

// const toggleItalic = () => {
// 	editor.value.chain().focus().toggleItalic().run()
// }


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