/**
 * All of these functions/exports are commands for the active editor
 * 
 * @param editor - the (text) editor instance
 */

// Methods ->

export const toggleBoldRun = (editor: any) => {
    editor.chain().focus().toggleBold().run()
}

export const toggleItalicRun = (editor: any) => {
    editor.chain().focus().toggleItalic().run()
}

export const toggleHeadingRun = (editor: any, level:number) => {
    editor.chain().focus().toggleHeading({ level }).run();
};

export const horizontalRuleRun = (editor:any) => {
	editor.chain().focus().setHorizontalRule().run()
};

export const toggleUnderlineRun = (editor: any) => {
    editor.chain().focus().toggleUnderline().run()
}

export const toggleBulletListRun = (editor: any) => {
    editor.chain().focus().toggleBulletList().run()
}

export const toggleOrderedListRun = (editor: any) => {
    editor.chain().focus().toggleOrderedList().run()
}

export const setUndoRun = (editor: any) => {
    editor.chain().focus().undo().run()
}

export const setRedoRun = (editor: any) => {
    editor.chain().focus().redo().run()
}

// export const toggleCode = () => {
// 	editor.value.chain().focus().toggleCode().run()
// }

export const toggleBlockquoteRun = (editor: any) => {
    editor.chain().focus().toggleBlockquote().run()
}

export const toggleCodeBlockRun = (editor: any) => {
    editor.chain().focus().toggleCodeBlock().run()
}

// export const toggleBoldRun = () => {
// 	editor.value.chain().focus().toggleBold().run()
// }