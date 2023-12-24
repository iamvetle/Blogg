import EditorModalRequirements from './EditorModalRequirements.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

/**
 * ! Should expand
 */

let titleProp = "you must test something"
let mockCharTitle = 8
let mockCharContent = 58
let mockTagsCount = 4
let mockModelValue = true

const factory = () => {
    return mount(EditorModalRequirements, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            title: titleProp,
            charTitle: mockCharTitle,
            charContent: mockCharContent,
            tagsCount: mockTagsCount,
            modelValue: mockModelValue
        },
        slots: {}
    })
};

describe('Testing the requirements modal used for the text editor', () => {

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
    test('Should have the UModal from nuxt ui', () => {
        wrapper = factory()
        
        // console.log(wrapper.html()) // print to self
        
        const uModal = wrapper.find("UModal")
        expect(uModal.exists()).toBe(true)
    })
    test('Should have the ucard from nuxt ui', () => {
        wrapper = factory()
        
        const uCard = wrapper.find("UCard")
        expect(uCard.exists()).toBe(true)
    })
    test('Should have the titleprop and it be rendered', () => {
        wrapper = factory()

        expect(wrapper.props("title")).toBeTruthy()
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    })
    
});