/**
 * All of these functions/exports are commands for the active editor
 * 
 * @param editor - the (text) editor instance
 */

// Methods ->

export const toggleBold = (editor: any) => {
    editor.chain().focus().toggleBold().run()
}

export const toggleItalic = (editor: any) => {
    editor.chain().focus().toggleItalic().run()
}

export const toggleHeading = (editor: any, level:number) => {
    editor.chain().focus().toggleHeading({ level }).run();
};

// export const horizontalRule = () => {
// 	editor.value.chain().focus().setHorizontalRule().run()
// };

export const toggleUnderline = (editor: any) => {
    editor.chain().focus().toggleUnderline().run()
}

export const toggleBulletList = (editor: any) => {
    editor.chain().focus().toggleBulletList().run()
}

export const toggleOrderedList = (editor: any) => {
    editor.chain().focus().toggleOrderedList().run()
}

export const setUndo = (editor: any) => {
    editor.chain().focus().undo().run()
}

export const setRedo = (editor: any) => {
    editor.chain().focus().redo().run()
}

// export const toggleCode = () => {
// 	editor.value.chain().focus().toggleCode().run()
// }

export const toggleBlockquote = (editor: any) => {
    editor.chain().focus().toggleBlockquote().run()
}

export const toggleCodeBlock = (editor: any) => {
    editor.chain().focus().toggleCodeBlock().run()
}

// export const toggleBold = () => {
// 	editor.value.chain().focus().toggleBold().run()
// }