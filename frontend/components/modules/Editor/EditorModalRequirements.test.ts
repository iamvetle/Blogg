import EditorModalRequirements from './EditorModalRequirements.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

let titleProp = "you must test something"
let descriptionProp = "test description of something"

const factory = () => {
    return mount(EditorModalRequirements, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            modelValue:true,
            title:titleProp,
            description:descriptionProp
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
        
        console.log(wrapper.html())
        
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
    test('Should have the description prop', () => {
        wrapper = factory()

        expect(wrapper.props("description")).toBeTruthy()
        expect(wrapper.html()).toContain(descriptionProp)
        
    })
    
});