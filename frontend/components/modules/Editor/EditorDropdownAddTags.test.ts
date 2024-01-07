import EditorDropdownAddTags from './EditorDropdownAddTags.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;
let pinia = createTestingPinia()

const factory = () => {
    return shallowMount(EditorDropdownAddTags, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing the add tags dropdown', () => {

    beforeEach(() => {
        vi.stubGlobal("getAllTags", () => {
            return null
        })
    });


    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
        vi.clearAllMocks()

    });

    test('Should exist', () => {
        wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })
    
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    })
    
});