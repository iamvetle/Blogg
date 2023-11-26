<template></template>

<script>
import { Node, mergeAttributes } from '@tiptap/core';

const CustomImage = Node.create({
    name: 'image',
    inline: true,
    group: 'inline',
    draggable: true,

    addAttributes() {
        return {
            src: {},
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            // Add your custom attribute
            id: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
                getAttrs: dom => ({
                    src: dom.getAttribute('src'),
                    title: dom.getAttribute('title'),
                    alt: dom.getAttribute('alt'),
                    id: dom.getAttribute('id'), // Get the custom attribute
                }),
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(HTMLAttributes)];
    },
});
</script>