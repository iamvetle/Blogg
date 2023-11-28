import EditorBubbleMenu from './EditorBubbleMenu.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import EditorButton from './EditorButton.vue';
import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';
import { BubbleMenu } from '@tiptap/vue-3';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const mockEditor = {
    isActive: vi.fn().mockImplementation((name) => name),
    chain: vi.fn().mockReturnThis(),
    focus: vi.fn().mockReturnThis(),
    // toggleBold: vi.fn().mockReturnThis(),
    run: vi.fn().mockReturnThis(),
    // Add other methods and properties as needed
};

const factory = () => {
    return shallowMount(EditorBubbleMenu, {
        global: {
            plugins: [pinia],
            components: {
                EditorButton,
                BubbleMenu
            },
            mocks: {
            },
            stubs: { EditorButton: true },
        },
        props: { //@ts-ignore
            editor: mockEditor
        },
        slots: {}
    })
};

describe('', () => {

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
    test('Should have an "editor" prop', () => {
        wrapper = factory()

        expect(wrapper.props("editor")).toBeTruthy()
    })
    test('Should have the bubble menu', () => {
        wrapper = factory()

        const bubble = wrapper.findComponent({ name: "BubbleMenu" })

        expect(bubble.exists()).toBe(true)
    })
    test('Should NOT shown the bubble menu if the editor prop is not truthy', async () => {
        wrapper = factory()

        await wrapper.setProps({ editor: undefined })

        const bubble = wrapper.findComponent({ name: "BubbleMenu" })

        expect(bubble.exists()).not.toBe(true)
    })
    test('Should be editorbuttons', () => {
      wrapper = factory()

      expect(wrapper.findAllComponents({ name:"EditorButton" })).toBeTruthy()
    })

});