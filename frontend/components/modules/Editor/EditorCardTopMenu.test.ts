import EditorCardTopMenu from './EditorCardTopMenu.vue';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import EditorButton from './EditorButton.vue';

// Icons
import bold_icon from '~/assets/icons/bold.svg';
import underline_icon from '~/assets/icons/underline.svg';
import bullet_list_icon from '~/assets/icons/bullet_list.svg';
import italic_icon from '~/assets/icons/italic.svg';
import number_list_icon from '~/assets/icons/number_list.svg';
import image_add_icon from '~/assets/icons/image-add-line.svg'
import url_link_add_icon from '~/assets/icons/link_add.svg'
import go_back_icon from '~/assets/icons/go_back_icon.svg';
import go_forward_icon from '~/assets/icons/go_forward_icon.svg';
import blockquote_icon from '~/assets/icons/double-quotes-r.svg'
import codeblock_icon from '~/assets/icons/codeblock_icon.svg'

import heading1_icon from '~/assets/icons/h1.svg'
import heading2_icon from '~/assets/icons/h2.svg'
import heading3_icon from '~/assets/icons/h3.svg'


let wrapper: any;
let pinia: any = createTestingPinia();

/** 
 * This mocks the (text) editor, so that i can assert whether the 
 * components have props or not
*/

const mockEditor = {
    isActive: vi.fn().mockImplementation((name) => name),
    chain: vi.fn().mockReturnThis(),
    focus: vi.fn().mockReturnThis(),
    // toggleBold: vi.fn().mockReturnThis(),
    run: vi.fn().mockReturnThis(),
    // Add other methods and properties as needed
};

const mockAddImageFunction = vi.fn();
const mockAddUrlLinkFunction = vi.fn();

const mockToggleBold = vi.fn();
const mockToggleItalic = vi.fn();
const mockToggleUnderline = vi.fn()
const mockToggleBulletList = vi.fn()
const mockToggleNumberList = vi.fn()
const mockSetUndo = vi.fn()
const mockSetRedo = vi.fn()
const mockToggleBlockquote = vi.fn()
const mockToggleCodeBlock = vi.fn()
const mockToggleHeading = vi.fn()

const factory = () => {
    return shallowMount(EditorCardTopMenu, {
        global: {
            plugins: [pinia],
            components: { EditorButton },
            mocks: {
                add_image_handle: mockAddImageFunction,
                add_url_link_handle: mockAddUrlLinkFunction,
                toggleBold: mockToggleBold,
                toggleItalic: mockToggleItalic,
                toggleUnderline: mockToggleUnderline,
                toggleBulletList: mockToggleBulletList,
                toggleOrderedList: mockToggleNumberList,
                setUndo: mockSetUndo,
                setRedo: mockSetRedo,
                toggleBlockquote: mockToggleBlockquote,
                toggleCodeBlock: mockToggleCodeBlock,
                toggleHeading:mockToggleHeading
            },
            stubs: {
                EditorButton: true
            },
        },
        props: { //@ts-ignore
            editor: mockEditor
        },
        slots: {},
    })
};

describe('Testing the EditorCard top menu', () => {

    beforeEach(() => {


    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should have (at least one) editor button(s)', () => {
        wrapper = factory()

        const button = (wrapper as any).findComponent({ name: "EditorButton" })

        expect(button.exists()).toBe(true)
    })

    /** BOLD OPTION TESTS */

    test('Should have a "bold" option component button', () => {
        wrapper = factory()

        const bold = (wrapper as any).findComponent("[data-test='bold_option']");

        expect(bold.exists()).toBe(true)
    })
    test('The bold option should an "icon" prop with a "bold" icon value', async () => {
        wrapper = factory()

        const bold = (wrapper as any).findComponent("[data-test='bold_option']");

        expect(bold.exists()).toBe(true)

        expect(bold.props("icon")).toBeTruthy()
        expect(bold.props("icon")).toBe(bold_icon)
    });
    test('The bold option should have "alt" be correct', () => {
        wrapper = factory()

        const bold = (wrapper as any).findComponent("[data-test='bold_option']");

        expect(bold.exists()).toBe(true)

        expect(bold.attributes("alt")).toBe("Bold")
        expect(bold.props("class")).toBeTypeOf("string")

    });
    test('If the bold option has a class, it should be string type', () => {
        wrapper = factory()

        const bold = (wrapper as any).findComponent("[data-test='bold_option']");

        if (bold) {
            expect(bold.attributes("class")).toBeTypeOf("string")
        }

    })
    test('The bold option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const bold = (wrapper as any).findComponent("[data-test='bold_option']");

        expect(bold.props("isActive")).toBe(mockEditor.isActive('bold'))
    })

    /** --- */

    /** --- */

    test('Should have a topmenu container', () => {
        wrapper = factory()

        const topMenuContainer = (wrapper as any).find("#top-menu-container'")

        expect(topMenuContainer.exists()).toBe(true)
        expect(topMenuContainer.classes()).toContain("flex")
    })

        /** ITALIC OPTION TESTS */

        test('Should have a "italic" option component button', () => {
            wrapper = factory()
    
            const italic = (wrapper as any).findComponent("[data-test='italic_option']");
    
            expect(italic.exists()).toBe(true)
        })
        test('The italic option should an "icon" prop with a "italic" icon value', () => {
            wrapper = factory()
    
            const italic = (wrapper as any).findComponent("[data-test='italic_option']");
    
            expect(italic.exists()).toBe(true)
    
            expect(italic.props("icon")).toBeTruthy()
            expect(italic.props("icon")).toBe(italic_icon)
        });
        test('The italic option should have "alt" be correct', () => {
            wrapper = factory()
    
            const italic = (wrapper as any).findComponent("[data-test='italic_option']");
    
            expect(italic.attributes("alt")).toBe("Italic")
    
        });
        test('If the italic option has a class, it should be string type', () => {
            wrapper = factory()
    
            const italic = wrapper.findComponent("[data-test='italic_option']");
    
            if (italic) {
    
                expect(italic.attributes("class")).toBeTypeOf("string")
    
            } else {
                expect(italic).toBeFalsy()
            }
    
        })
        test('The italic option should have the "isActive" prop with the correct value', () => {
            wrapper = factory()
    
            const italic = (wrapper as any).findComponent("[data-test='italic_option']");
    
            expect(italic.props("isActive")).toBe(mockEditor.isActive('italic'))
        })

    /** ---  */

    /** UNDERLINE OPTION TESTS */

    test('Should have a "underline" option component button', () => {
        wrapper = factory()

        const underline = (wrapper as any).findComponent("[data-test='underline_option']");

        expect(underline.exists()).toBe(true)
    })
    test('The underline option should an "icon" prop with a "underline" icon value', () => {
        wrapper = factory()

        const underline = (wrapper as any).findComponent("[data-test='underline_option']");

        expect(underline.exists()).toBe(true)

        expect(underline.props("icon")).toBeTruthy()
        expect(underline.props("icon")).toBe(underline_icon)
    });
    test('The underline option should have "alt" be correct', () => {
        wrapper = factory()

        const underline = (wrapper as any).findComponent("[data-test='underline_option']");

        expect(underline.attributes("alt")).toBe("Underline")
    });
    test('If the underline option has a class, it should be string type', () => {
        wrapper = factory()

        const underline = wrapper.findComponent("[data-test='underline_option']");

        if (underline) {

            expect(underline.attributes("class")).toBeTypeOf("string")

        } else {
            expect(underline).toBeFalsy()
        }

    })
    test('The underline option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const underline = (wrapper as any).findComponent("[data-test='underline_option']");

        expect(underline.props("isActive")).not.toBe(mockEditor.isActive('undesrline'))
        expect(underline.props("isActive")).toBe(mockEditor.isActive('underline'))
    })

    /** --- */

    test('Should be a "top three" div containing "bold", "italic" and "underline"', () => {
        wrapper = factory()

        // Most common
        const topThree = wrapper.find("#top-three")

        expect(topThree.exists()).toBe(true)
        expect(topThree.classes()).toContain("flex")
        expect(topThree.element.tagName).toBe("DIV")

        const all_components_in_div = topThree.findAllComponents({ name: "EditorButton" })

        expect(all_components_in_div).toHaveLength(3)

        const bold_image = topThree.findComponent("[data-test='bold_option']")
        expect(bold_image.exists()).toBe(true)

        const italic_option = topThree.findComponent("[data-test='italic_option']")
        expect(italic_option.exists()).toBe(true)

        const underline_option = topThree.findComponent("[data-test='underline_option']")
        expect(underline_option.exists()).toBe(true)
    })
    test('Should be as many "option holders" as "icons/options"', () => {
        wrapper = factory()

        const all_components = wrapper.findAllComponents({ name: "EditorButton" })
        const all_option_holders = wrapper.findAll(".option-holder")

        expect(all_components).toHaveLength(all_option_holders.length)
    })

    /** BULLET LIST OPTION TESTS */

    test('Should have a "bullet list" option component button', () => {
        wrapper = factory()

        const bullet_list = (wrapper as any).findComponent("[data-test='bullet_list_option']");

        expect(bullet_list.exists()).toBe(true)
    })
    test('The bullet_list option should an "icon" prop with a "bullet_list" icon value', () => {
        wrapper = factory()

        const bullet_list = (wrapper as any).findComponent("[data-test='bullet_list_option']");

        expect(bullet_list.exists()).toBe(true)

        expect(bullet_list.props("icon")).toBeTruthy()
        expect(bullet_list.props("icon")).toBe(bullet_list_icon)
    });
    test('The bullet_list option should have "alt" be correct', () => {
        wrapper = factory()

        const bullet_list = (wrapper as any).findComponent("[data-test='bullet_list_option']");

        expect(bullet_list.attributes("alt")).toBe("Unordered list")

    });
    test('If the bullet_list option has a class, it should be string type', () => {
        wrapper = factory()

        const bullet_list = wrapper.findComponent("[data-test='bullet_list_option']");

        if (bullet_list) {

            expect(bullet_list.attributes("class")).toBeTypeOf("string")

        } else {
            expect(bullet_list).toBeFalsy()
        }

    })
    test('The bullet_list option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const bullet_list = (wrapper as any).findComponent("[data-test='bullet_list_option']");

        expect(bullet_list.props("isActive")).toBe(mockEditor.isActive('bulletList'))
    })

    /** ---  */

    /** NUMBER LIST OPTION TESTS */

    test('Should have a "number-list" option component button', () => {
        wrapper = factory()

        const number_list = (wrapper as any).findComponent("[data-test='number_list_option']");

        expect(number_list.exists()).toBe(true)
    })
    test('The number_list option should an "icon" prop with a "number_list" icon value', () => {
        wrapper = factory()

        const number_list = (wrapper as any).findComponent("[data-test='number_list_option']");

        expect(number_list.exists()).toBe(true)

        expect(number_list.props("icon")).toBeTruthy()
        expect(number_list.props("icon")).toBe(number_list_icon)
    });
    test('The number_list option should have "alt" be correct', () => {
        wrapper = factory()

        const number_list = (wrapper as any).findComponent("[data-test='number_list_option']");

        expect(number_list.attributes("alt")).toBe("Ordered list")

    });
    test('If the number_list option has a class, it should be string type', () => {
        wrapper = factory()

        const number_list = wrapper.findComponent("[data-test='number_list_option']");

        if (number_list) {

            expect(number_list.attributes("class")).toBeTypeOf("string")

        } else {
            expect(number_list).toBeFalsy()
        }

    })
    test('The number_list option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const number_list = (wrapper as any).findComponent("[data-test='number_list_option']");

        expect(number_list.props("isActive")).toBe(mockEditor.isActive('orderedList'))
    })

    /** --- */


    /** IMAGE OPTIONS */

    test('Should have a "addimage" option component button', () => {
        wrapper = factory()

        const image_add = (wrapper as any).findComponent("[data-test='image_option']");

        expect(image_add.exists()).toBe(true)
    })
    test('The image_add option should an "icon" prop with a "image_add" icon value', () => {
        wrapper = factory()

        const image_add = (wrapper as any).findComponent("[data-test='image_option']");

        expect(image_add.exists()).toBe(true)

        expect(image_add.props("icon")).toBeTruthy()
        expect(image_add.props("icon")).toBe(image_add_icon)
    });
    test('The image_add option should have "alt" be correct', () => {
        wrapper = factory()

        const image_add = (wrapper as any).findComponent("[data-test='image_option']");

        expect(image_add.attributes("alt")).toBe("Add image")

    });
    test('If the image_add option has a class, it should be string type', () => {
        wrapper = factory()

        const image_add = wrapper.findComponent("[data-test='image_option']");

        if (image_add) {

            expect(image_add.attributes("class")).toBeTypeOf("string")

        } else {
            expect(image_add).toBeFalsy()
        }

    })
    test('There should be an add_image type of function', () => {
        wrapper = factory()

        const add_image_handle = wrapper.vm.add_image_handle

        expect(add_image_handle).toBeDefined()
        expect(typeof add_image_handle).toBe("function")
    })
    test('The image option button should trigger the function when clicked', async () => {
        wrapper = factory()

        const image_add = (wrapper as any).getComponent("[data-test='image_option']");

        await image_add.trigger("click")

        await flushPromises()

        expect(mockAddImageFunction).toHaveBeenCalledOnce()

    })
    test('The image option should NOT have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const image = (wrapper as any).findComponent("[data-test='image_option']");

        expect(image.exists()).toBe(true)

        expect(image.props("isActive")).not.toBeTruthy()
    })

    /** URL OPTIONS */

    test('Should have a "add url" option component button', () => {
        wrapper = factory()

        const url_link_add = (wrapper as any).findComponent("[data-test='url_link_option']");

        expect(url_link_add.exists()).toBe(true)
    })
    test('The url_link_add option should an "icon" prop with a "url_link_add" icon value', () => {
        wrapper = factory()

        const url_link_add = (wrapper as any).findComponent("[data-test='url_link_option']");

        expect(url_link_add.exists()).toBe(true)

        expect(url_link_add.props("icon")).toBeTruthy()
        expect(url_link_add.props("icon")).toBe(url_link_add_icon)
    });
    test('The url_link_add option should have "alt" be correct', () => {
        wrapper = factory()

        const url_link_add = (wrapper as any).findComponent("[data-test='url_link_option']");

        expect(url_link_add.attributes("alt")).toBe("Add hyperlink")

    });
    test('If the url_link_add option has a class, it should be string type', () => {
        wrapper = factory()

        const url_link_add = wrapper.findComponent("[data-test='url_link_option']");

        if (url_link_add) {

            expect(url_link_add.attributes("class")).toBeTypeOf("string")

        } else {
            expect(url_link_add).toBeFalsy()
        }

    })

    test('There should be an add_url_link type of function', () => {
        wrapper = factory()

        const add_url_link_function = wrapper.vm.add_url_link_handle

        expect(add_url_link_function).toBeDefined()
        expect(typeof add_url_link_function).toBe("function")
    })
    test('The add url link option button should trigger the function when clicked', async () => {
        wrapper = factory()

        const url_link_add = (wrapper as any).getComponent("[data-test='url_link_option']");

        await url_link_add.trigger("click")

        await flushPromises()

        expect(mockAddUrlLinkFunction).toHaveBeenCalledOnce()

    })
    test('The url_link_add option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const url_link = (wrapper as any).findComponent("[data-test='url_link_option']");

        expect(url_link.props("isActive")).toBe(mockEditor.isActive('link'))
    })

    /** --- */

    test('There should be a wrapper around the add image and add url options', () => {
        wrapper = factory()

        const addOptions = wrapper.get("#add_options")

        expect(addOptions.classes()).toContain("flex")
        expect(addOptions.exists()).toBe(true)
        expect(addOptions.element.tagName).toBe("DIV")

        const all_components_in_div = addOptions.findAllComponents({ name: "EditorButton" })

        expect(all_components_in_div).toHaveLength(2)

        const image_option = addOptions.findComponent("[data-test='image_option']")
        expect(image_option.exists()).toBe(true)

        const url_link_option = addOptions.findComponent("[data-test='url_link_option']")
        expect(url_link_option.exists()).toBe(true)
    })

    /** --- */

    /** REGRET/GO BACK STEP OPTIONS */

    test('Should have a "regret or go back" option component button', () => {
        wrapper = factory()

        const go_back = (wrapper as any).findComponent("[data-test='undo_option']");

        expect(go_back.exists()).toBe(true)
    })
    test('The go_back option should an "icon" prop with a "go_back" icon value', () => {
        wrapper = factory()

        const go_back = (wrapper as any).findComponent("[data-test='undo_option']");

        expect(go_back.exists()).toBe(true)

        expect(go_back.props("icon")).toBeTruthy()
        expect(go_back.props("icon")).toBe(go_back_icon)
    });
    test('The go_back option should have "alt" be correct', () => {
        wrapper = factory()

        const go_back = (wrapper as any).findComponent("[data-test='undo_option']");

        expect(go_back.attributes("alt")).toBe("Undo")

    });
    test('If the go_back option has a class, it should be string type', () => {
        wrapper = factory()

        const go_back = wrapper.findComponent("[data-test='undo_option']");

        if (go_back) {

            expect(go_back.attributes("class")).toBeTypeOf("string")

        } else {
            expect(go_back).toBeFalsy()
        }

    })
    test('The go_back option should NOT have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const go_back = (wrapper as any).findComponent("[data-test='undo_option']");

        expect(go_back.exists()).toBe(true)

        expect(go_back.props("isActive")).not.toBeTruthy()
    })


    /** --- */

    /** GO FORWARD STEP OPTIONS */

    test('Should have a "redo" go forward option component button', () => {
        wrapper = factory()

        const go_forward = (wrapper as any).findComponent("[data-test='redo_option']");

        expect(go_forward.exists()).toBe(true)
    })
    test('The go_forward option should an "icon" prop with a "go_forward" icon value', () => {
        wrapper = factory()

        const go_forward = (wrapper as any).findComponent("[data-test='redo_option']");

        expect(go_forward.exists()).toBe(true)

        expect(go_forward.props("icon")).toBeTruthy()
        expect(go_forward.props("icon")).toBe(go_forward_icon)
    });
    test('The go_forward option should have "alt" be correct', () => {
        wrapper = factory()

        const go_forward = (wrapper as any).findComponent("[data-test='redo_option']");

        expect(go_forward.attributes("alt")).toBe("Redo")

    });
    test('If the go_forward option has a class, it should be string type', () => {
        wrapper = factory()

        const go_forward = wrapper.findComponent("[data-test='redo_option']");

        if (go_forward) {

            expect(go_forward.attributes("class")).toBeTypeOf("string")

        } else {
            expect(go_forward).toBeFalsy()
        }

    })
    test('The go_forward option should NOT have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const go_forward = (wrapper as any).findComponent("[data-test='redo_option']");

        expect(go_forward.exists()).toBe(true)

        expect(go_forward.props("isActive")).not.toBeTruthy()
    })

    /** --- */

    test('There should be a wrapper around the "go back" and "go forward" options', () => {
        wrapper = factory()

        const moveOptions = wrapper.get("#undo_redo_options")

        expect(moveOptions.classes()).toContain("flex")

        expect(moveOptions.exists()).toBe(true)
        expect(moveOptions.element.tagName).toBe("DIV")

        const all_components_in_div = moveOptions.findAllComponents({ name: "EditorButton" })

        expect(all_components_in_div).toHaveLength(2)

        const go_back = moveOptions.findComponent("[data-test='undo_option']")
        expect(go_back.exists()).toBe(true)

        const go_forward = moveOptions.findComponent("[data-test='redo_option']")
        expect(go_forward.exists()).toBe(true)
    })

    /** --- */

    /** BLOCKQUOTE */

    test('Should have a "blockquote" option component button', () => {
        wrapper = factory()

        const blockquote_option = (wrapper as any).findComponent("[data-test='blockquote_option']");

        expect(blockquote_option.exists()).toBe(true)
    })
    test('The blockquote option should have an "icon" prop with a "quote" icon value', () => {
        wrapper = factory()

        const blockquote = (wrapper as any).findComponent("[data-test='blockquote_option']");

        expect(blockquote.exists()).toBe(true)

        expect(blockquote.props("icon")).toBeTruthy()
        expect(blockquote.props("icon")).toBe(blockquote_icon)
    });
    test('The blockquote option should have "alt" be correct', () => {
        wrapper = factory()

        const blockquote = (wrapper as any).findComponent("[data-test='blockquote_option']");

        expect(blockquote.attributes("alt")).toBe("Blockquote")

    });
    test('If the blockquote option has a class, it should be string type', () => {
        wrapper = factory()

        const blockquote = wrapper.findComponent("[data-test='blockquote_option']");

        if (blockquote) {

            expect(blockquote.attributes("class")).toBeTypeOf("string")

        } else {
            expect(blockquote).toBeFalsy()
        }
    })
    test('The blockquote option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const blockquote = (wrapper as any).findComponent("[data-test='blockquote_option']");

        expect(blockquote.exists()).toBe(true)

        expect(blockquote.props("isActive")).toBe(mockEditor.isActive('blockquote'))
    })


    /** --- */

    /** CODEBLOCK  */

    test('Should have a "codeblock" option component button', () => {
        wrapper = factory()

        const codeblock_option = (wrapper as any).findComponent("[data-test='codeblock_option']");

        expect(codeblock_option.exists()).toBe(true)
    })
    test('The codeblock option should have an "icon" prop with a "quote" icon value', () => {
        wrapper = factory()

        const codeblock = (wrapper as any).findComponent("[data-test='codeblock_option']");

        expect(codeblock.exists()).toBe(true)

        expect(codeblock.props("icon")).toBeTruthy()
        expect(codeblock.props("icon")).toBe(codeblock_icon)
    });
    test('The codeblock option should have "alt" be correct', () => {
        wrapper = factory()

        const codeblock = (wrapper as any).findComponent("[data-test='codeblock_option']");

        expect(codeblock.attributes("alt")).toBe("Codeblock")

    });
    test('If the codeblock option has a class, it should be string type', () => {
        wrapper = factory()

        const codeblock = wrapper.findComponent("[data-test='codeblock_option']");

        if (codeblock) {

            expect(codeblock.attributes("class")).toBeTypeOf("string")

        } else {
            expect(codeblock).toBeFalsy()
        }
    })
    test('The codeblock option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const codeblock = (wrapper as any).findComponent("[data-test='codeblock_option']");

        expect(codeblock.exists()).toBe(true)

        expect(codeblock.props("isActive")).toBe(mockEditor.isActive('codeBlock'))
    })

    /** --- */

    test('There should be a wrapper around the add blockqyote and codeblock options', () => {
        wrapper = factory()

        const addOptions = wrapper.get("#codeQuote_options")

        expect(addOptions.classes()).toContain("flex")
        expect(addOptions.exists()).toBe(true)
        expect(addOptions.element.tagName).toBe("DIV")

        const all_components_in_div = addOptions.findAllComponents({ name: "EditorButton" })

        expect(all_components_in_div).toHaveLength(2)

        const blockquote = addOptions.findComponent("[data-test='blockquote_option']")
        expect(blockquote.exists()).toBe(true)

        const codeblock = addOptions.findComponent("[data-test='codeblock_option']")
        expect(codeblock.exists()).toBe(true)
    })

    /** HEADING 2 OPTION TESTS */

    test('Should have a "heading1" option component button', () => {
        wrapper = factory()

        const heading1 = (wrapper as any).findComponent("[data-test='heading1_option']");

        expect(heading1.exists()).toBe(true)
    })
    test('The heading1 option should an "icon" prop with a "heading1" icon value', () => {
        wrapper = factory()

        const heading1 = (wrapper as any).findComponent("[data-test='heading1_option']");

        expect(heading1.exists()).toBe(true)

        expect(heading1.props("icon")).toBeTruthy()
        expect(heading1.props("icon")).toBe(heading1_icon)
    });
    test('The heading1 option should have "alt" be correct', () => {
        wrapper = factory()

        const heading1 = (wrapper as any).findComponent("[data-test='heading1_option']");

        expect(heading1.attributes("alt")).toBe("Heading 1")

    });
    test('If the heading1 option has a class, it should be string type', () => {
        wrapper = factory()

        const heading1 = wrapper.findComponent("[data-test='heading1_option']");

        if (heading1) {

            expect(heading1.attributes("class")).toBeTypeOf("string")

        } else {
            expect(heading1).toBeFalsy()
        }

    })
    test('The heading1 option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const heading1 = (wrapper as any).findComponent("[data-test='heading1_option']");

        expect(heading1.props("isActive")).toBe(mockEditor.isActive('heading', { level: 1 }))
    })

    /** HEADING 2 OPTION TESTS */

    test('Should have a "heading2" option component button', () => {
        wrapper = factory()

        const heading2 = (wrapper as any).findComponent("[data-test='heading2_option']");

        expect(heading2.exists()).toBe(true)
    })
    test('The heading2 option should an "icon" prop with a "heading2" icon value', () => {
        wrapper = factory()

        const heading2 = (wrapper as any).findComponent("[data-test='heading2_option']");

        expect(heading2.exists()).toBe(true)

        expect(heading2.props("icon")).toBeTruthy()
        expect(heading2.props("icon")).toBe(heading2_icon)
    });
    test('The heading2 option should have "alt" be correct', () => {
        wrapper = factory()

        const heading2 = (wrapper as any).findComponent("[data-test='heading2_option']");

        expect(heading2.attributes("alt")).toBe("Heading 2")

    });
    test('If the heading2 option has a class, it should be string type', () => {
        wrapper = factory()

        const heading2 = wrapper.findComponent("[data-test='heading2_option']");

        if (heading2) {

            expect(heading2.attributes("class")).toBeTypeOf("string")

        } else {
            expect(heading2).toBeFalsy()
        }

    })
    test('The heading2 option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const heading2 = (wrapper as any).findComponent("[data-test='heading2_option']");

        expect(heading2.props("isActive")).toBe(mockEditor.isActive('heading', { level: 2 }))
    })

    /** HEADING 3 OPTION TESTS */

    test('Should have a "heading3" option component button', () => {
        wrapper = factory()

        const heading3 = (wrapper as any).findComponent("[data-test='heading3_option']");

        expect(heading3.exists()).toBe(true)
    })
    test('The heading3 option should an "icon" prop with a "heading3" icon value', () => {
        wrapper = factory()

        const heading3 = (wrapper as any).findComponent("[data-test='heading3_option']");

        expect(heading3.exists()).toBe(true)

        expect(heading3.props("icon")).toBeTruthy()
        expect(heading3.props("icon")).toBe(heading3_icon)
    });
    test('The heading3 option should have "alt" be correct', () => {
        wrapper = factory()

        const heading3 = (wrapper as any).findComponent("[data-test='heading3_option']");

        expect(heading3.attributes("alt")).toBe("Heading 3")

    });
    test('If the heading3 option has a class, it should be string type', () => {
        wrapper = factory()

        const heading3 = wrapper.findComponent("[data-test='heading3_option']");

        if (heading3) {

            expect(heading3.attributes("class")).toBeTypeOf("string")

        } else {
            expect(heading3).toBeFalsy()
        }

    })
    test('The heading3 option should have the "isActive" prop with the correct value', () => {
        wrapper = factory()

        const heading3 = (wrapper as any).findComponent("[data-test='heading3_option']");

        expect(heading3.props("isActive")).toBe(mockEditor.isActive('heading', { level: 3 }))
    })

        /** --- */

        test('There should be a wrapper around the add heading 1, 2 and 3 options', () => {
            wrapper = factory()
    
            const addOptions = wrapper.get("#heading_options")
    
            expect(addOptions.classes()).toContain("flex")
            expect(addOptions.exists()).toBe(true)
            expect(addOptions.element.tagName).toBe("DIV")
    
            const all_components_in_div = addOptions.findAllComponents({ name: "EditorButton" })
    
            expect(all_components_in_div).toHaveLength(3)
    
            const heading1 = addOptions.findComponent("[data-test='heading1_option']")
            expect(heading1.exists()).toBe(true)
    
            const heading2 = addOptions.findComponent("[data-test='heading2_option']")
            expect(heading2.exists()).toBe(true)

            const heading3 = addOptions.findComponent("[data-test='heading3_option']")
            expect(heading3.exists()).toBe(true)
        })
});

/** SNAPSHOT */

// test('Expect editor top to match snapshot', () => {
//     wrapper = factory()

//     expect(wrapper).toMatchSnapshot()
// })

describe("Testing if the options trigger the correct functions", () => {


    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })
    /** TESTING FUNCTIONS */

    test('There should exist a toggleBold function that gets triggered by the bold option when it is clicked', async () => {
        wrapper = factory()

        expect(typeof wrapper.vm.toggleBold).toBe("function")

        const bold_option = wrapper.get("[data-test='bold_option']")

        await bold_option.trigger("click")

        await flushPromises()

        expect(mockToggleBold).toHaveBeenCalledOnce()
    })
    test('There should exist a toggleItalic function that gets triggered by the italic option when it is clicked', async () => {
        wrapper = factory()

        expect(typeof wrapper.vm.toggleItalic).toBe("function")

        const option = wrapper.get("[data-test='italic_option']")

        await option.trigger("click")

        await flushPromises()

        expect(mockToggleItalic).toHaveBeenCalledOnce()
    })
    test('There should exist a toggleUnderline function that gets triggered by the underline option when it is clicked', async () => {
        wrapper = factory()

        expect(typeof wrapper.vm.toggleUnderline).toBe("function")

        const option = wrapper.get("[data-test='underline_option']")

        await option.trigger("click")

        await flushPromises()

        expect(mockToggleUnderline).toHaveBeenCalledOnce()
    })
    test('There should exist a toggleBulletList function that gets triggered by the bullet list option when it is clicked', async () => {

        wrapper = factory()

        expect(typeof wrapper.vm.toggleBulletList).toBe("function")

        const option = wrapper.get("[data-test='bullet_list_option']")

        await option.trigger("click")

        expect(mockToggleBulletList).toHaveBeenCalledOnce()
    })
    test('There should exist a toggleOrderedList function that gets triggered by the ordered list option when it is clicked', async () => {

        wrapper = factory()

        expect(typeof wrapper.vm.toggleOrderedList).toBe("function")

        const option = wrapper.get("[data-test='number_list_option']")

        await option.trigger("click")

        await flushPromises()

        expect(mockToggleNumberList).toHaveBeenCalledOnce()
    })
    test('There should exist a undo function that gets triggered by the undo / go-back option when it is clicked', async () => {

        wrapper = factory()

        expect(typeof wrapper.vm.setUndo).toBe("function")

        const option = wrapper.get("[data-test='undo_option']")

        await option.trigger("click")

        await flushPromises()

        expect(mockSetUndo).toHaveBeenCalledOnce()
    })
    test('There should exist a redo function that gets triggered by the redo / go-forward option when it is clicked', async () => {

        wrapper = factory()

        expect(typeof wrapper.vm.setUndo).toBe("function")

        const option = wrapper.get("[data-test='redo_option']")

        await option.trigger("click")

        await flushPromises()

        expect(mockSetRedo).toHaveBeenCalledOnce()
    })
    test('There should exist a toggle blockquote function that gets triggered by the quote option when it is clicked', async () => {

        wrapper = factory()

        expect(typeof wrapper.vm.setUndo).toBe("function")

        const option = wrapper.get("[data-test='blockquote_option']")

        await option.trigger("click")

        await flushPromises()

        expect(mockToggleBlockquote).toHaveBeenCalledOnce()
    })
    test('There should exist a codeblock blockquote function that gets triggered by the codeblock option when it is clicked', async () => {

        wrapper = factory()

        expect(typeof wrapper.vm.toggleCodeBlock).toBe("function")

        const option = wrapper.get("[data-test='codeblock_option']")

        await option.trigger("click")

        await flushPromises()

        expect(mockToggleCodeBlock).toHaveBeenCalledOnce()
    })
    test('There should exist a codeblock blockquote function that gets triggered by the codeblock option when it is clicked', async () => {

        wrapper = factory()

        expect(typeof wrapper.vm.toggleHeading).toBe("function")

        const option = wrapper.get("[data-test='heading1_option']")

        await option.trigger("click")

        await flushPromises()

        expect(mockToggleHeading).toHaveBeenCalledOnce()
    })
})