import EditorMenuFloating from '~/components/modules/Editor/EditorMenuFloating.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { FloatingMenu } from '@tiptap/vue-3'

let wrapper: any;

const mockEditor = {
    isActive: vi.fn().mockImplementation((name) => name),
    chain: vi.fn().mockReturnThis(),
    focus: vi.fn().mockReturnThis(),
    // toggleBold: vi.fn().mockReturnThis(),
    run: vi.fn().mockReturnThis(),
    registerPlugin: vi.fn().mockReturnThis(),
    unregisterPlugin: vi.fn().mockReturnThis(),


    // Add other methods and properties as needed
};
const factory = () => {
    return mount(EditorMenuFloating, {
        global: {
            plugins: [],
            components: {
                FloatingMenu
            },
            mocks: {},
            stubs: {
                EditorButton: true,
                InputFile: true
            },
        },
        props: { //@ts-ignore
            editor: mockEditor,
        },
        slots: {}
    })
};

describe('Testing the EditorMenuFloating component', () => {

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
    test('Should have the floatingMenu component', () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: "FloatingMenu" }))
    })
    test('Should have the one button and one input inside of the div wrapper', () => {
        wrapper = factory()
    
        const addImageDivWrapper = wrapper.find("[data-test='add_image_button_sum']")
    
        expect(addImageDivWrapper.exists()).toBe(true)

        expect(addImageDivWrapper.findComponent({ name:"EditorButton" }).exists()).toBe(true)
        expect(addImageDivWrapper.find("[data-test='add_image']").exists()).toBe(true)

        expect(addImageDivWrapper.find("[data-test='add_image_file_input']").exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })

});