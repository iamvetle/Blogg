<template>
	<floating-menu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }"
		class="not-prose flex-col items-center md:flex-row relative md:-left-[225px] -left-[80px] flex md:space-x-3 rounded-md border max-md:space-y-3 p-1 bg-plain shadow-md">

		<EditorButton @button-click="$emit('addImage')" :icon="add_image_icon" alt="add_image" />

		<EditorButton :is-active="editor.isActive('link')" @button-click="$emit('setLink')" :icon="link_icon" alt="link" />

		<EditorButton :is-active="editor.isActive('heading', { level: 1 })" @button-click="$emit('toggleHeading1')"
			:icon="heading_1_icon" alt="heading 1" />

		<EditorButton :is-active="editor.isActive('heading', { level: 2 })" @button-click="$emit('toggleHeading2')"
			:icon="heading_2_icon" alt="heading 2" />

		<EditorButton @button-click="$emit('setHorizontalRule')" :icon="seperator_icon" alt="seperator" />
	</floating-menu>
</template>

<script setup lang="ts">
/**
 * This component is part of the text editor. It is the floating menu.
 */

// Images (svgs)
import add_image_icon from '~/assets/icons/image-add-line.svg'

import link_icon from '~/assets/icons/link.svg'
import seperator_icon from '~/assets/separator.svg'

import heading_1_icon from '~/assets/icons/h-1.svg'
import heading_2_icon from '~/assets/icons/h-2.svg'

import { FloatingMenu } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core';

// const emit = defineEmits()

defineProps<{
  editor: Editor | undefined;
}>();

const emit = defineEmits()

// husk at hermer etter medium

// methods 


</script>

<style scoped lang="scss">
</style>