import EditorCardTopMenu from './EditorCardTopMenu.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import EditorButton from './EditorButton.vue';
import bold_icon from '~/assets/icons/bold.svg';
import underline_icon from '~/assets/icons/underline.svg';
import bullet_list_icon from '~/assets/icons/bullet_list.svg';
import italic_icon from '~/assets/icons/italic.svg';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const factory = () => {
    return shallowMount(EditorCardTopMenu, {
        global: {
            plugins: [pinia],
            components: { EditorButton },
            mocks: {},
            stubs: {
                EditorButton: true
            },
        },
        props: {},
        slots: {}
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

        const bold = (wrapper as any).findComponent("[data-test='bold']");

        expect(bold.exists()).toBe(true)
    })
    test('The bold option should an "icon" prop with a "bold" icon value', () => {
        wrapper = factory()

        const bold = (wrapper as any).findComponent("[data-test='bold']");

        expect(bold.exists()).toBe(true)

        expect(bold.props("icon")).toBeTruthy()
        expect(bold.props("icon")).toBe(bold_icon)
    });
    test('The bold option should have "alt" be correct', () => {
        wrapper = factory()

        const bold = (wrapper as any).findComponent("[data-test='bold']");

        expect(bold.exists()).toBe(true)

        expect(bold.attributes("alt")).toBe("Bold")
        expect(bold.props("class")).toBeTypeOf("string")

    });
    test('If the bold option has a class, it should be string type', () => {
        wrapper = factory()

        const bold = (wrapper as any).findComponent("[data-test='bold']");

        if (bold) {
            expect(bold.attributes("class")).toBeTypeOf("string")
        }

    })

    /** ---  */

    test('Should have a topmenu container', () => {
        wrapper = factory()

        const topMenuContainer = (wrapper as any).find("#top-menu-container'")

        expect(topMenuContainer.exists()).toBe(true)
    })

    /** ITALIC OPTION TESTS */

    test('Should have a "italic" option component button', () => {
        wrapper = factory()

        const italic = (wrapper as any).findComponent("[data-test='italic']");

        expect(italic.exists()).toBe(true)
    })
    test('The italic option should an "icon" prop with a "italic" icon value', () => {
        wrapper = factory()

        const italic = (wrapper as any).findComponent("[data-test='italic']");

        expect(italic.exists()).toBe(true)

        expect(italic.props("icon")).toBeTruthy()
        expect(italic.props("icon")).toBe(italic_icon)
    });
    test('The italic option should have "alt" be correct', () => {
        wrapper = factory()

        const italic = (wrapper as any).findComponent("[data-test='italic']");

        expect(italic.attributes("alt")).toBe("Italic")

    });
    test('If the italic option has a class, it should be string type', () => {
        wrapper = factory()

        const italic = wrapper.findComponent("[data-test='italic']");

        if (italic) {

            expect(italic.attributes("class")).toBeTypeOf("string")

        } else {
            expect(italic).toBeFalsy()
        }

    })

    /** ---  */

    /** UNDERLINE OPTION TESTS */

    test('Should have a "underline" option component button', () => {
        wrapper = factory()

        const underline = (wrapper as any).findComponent("[data-test='underline']");

        expect(underline.exists()).toBe(true)
    })
    test('The underline option should an "icon" prop with a "underline" icon value', () => {
        wrapper = factory()

        const underline = (wrapper as any).findComponent("[data-test='underline']");

        expect(underline.exists()).toBe(true)

        expect(underline.props("icon")).toBeTruthy()
        expect(underline.props("icon")).toBe(underline_icon)
    });
    test('The underline option should have "alt" be correct', () => {
        wrapper = factory()

        const underline = (wrapper as any).findComponent("[data-test='underline']");

        expect(underline.attributes("alt")).toBe("Underline")
    });
    test('If the underline option has a class, it should be string type', () => {
        wrapper = factory()

        const underline = wrapper.findComponent("[data-test='underline']");

        if (underline) {

            expect(underline.attributes("class")).toBeTypeOf("string")

        } else {
            expect(underline).toBeFalsy()
        }

    })

    /** --- */

    test('Should be a "top three" div', () => {
        wrapper = factory()

        // Most common
        const topThree = wrapper.find("#top-three")

        expect(topThree.exists()).toBe(true)
        expect(topThree.element.tagName).toBe("DIV")
    })
    test('Should be as many "option holders" as "icons/options"', () => {
        wrapper = factory()

        const all_components = wrapper.findAllComponents({ name:"EditorButton" })
        const all_option_holders = wrapper.findAll(".option-holder")

        expect(all_components).toHaveLength(all_option_holders.length)
    })

        /** BULLET LIST OPTION TESTS */

        test('Should have a "italic" option component button', () => {
            wrapper = factory()
    
            const bullet_list = (wrapper as any).findComponent("[data-test='bullet_list']");
    
            expect(bullet_list.exists()).toBe(true)
        })
        test('The bullet_list option should an "icon" prop with a "bullet_list" icon value', () => {
            wrapper = factory()
    
            const bullet_list = (wrapper as any).findComponent("[data-test='bullet_list']");
    
            expect(bullet_list.exists()).toBe(true)
    
            expect(bullet_list.props("icon")).toBeTruthy()
            expect(bullet_list.props("icon")).toBe(bullet_list_icon)
        });
        test('The bullet_list option should have "alt" be correct', () => {
            wrapper = factory()
    
            const bullet_list = (wrapper as any).findComponent("[data-test='bullet_list']");
    
            expect(bullet_list.attributes("alt")).toBe("Bullet list")
    
        });
        test('If the bullet_list option has a class, it should be string type', () => {
            wrapper = factory()
    
            const bullet_list = wrapper.findComponent("[data-test='bullet_list']");
    
            if (bullet_list) {
    
                expect(bullet_list.attributes("class")).toBeTypeOf("string")
    
            } else {
                expect(bullet_list).toBeFalsy()
            }
    
        })
    
        /** ---  */

});