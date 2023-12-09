import EditorModalAddURLLink from './EditorModalAddURLLink.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(EditorModalAddURLLink, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {
                InputText: true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the editor add url link component ', () => {

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
    test('Should render the title', () => {
        let title = "Add url link"

        wrapper = factory()


        const divTitle = wrapper.find("[data-test='modal_title']")

        expect(divTitle.text()).toContain(title)
    })
    test('Should have a place to input the url string/text', () => {
        wrapper = factory()

        const inputDiv = wrapper.find("[data-test='url_link_input']")
        expect(inputDiv.exists()).toBe(true)

        const inputComp = wrapper.findComponent({ name: "InputText" })
        expect(inputComp.exists()).toBe(true)

    })
    test('Should have an "abort" option', () => {
        wrapper = factory()

        const optionsDiv = wrapper.find("[data-test='options']")
        expect(optionsDiv.exists())

        const cancelOption = optionsDiv.find("[data-test='cancel_adding_urlLink']")
        expect(cancelOption.text()).toBe("Cancel")
    })
    test('Should have an "confirm" option', () => {
        wrapper = factory()

        const optionsDiv = wrapper.find("[data-test='options']")
        expect(optionsDiv.exists())

        const confirmOption = optionsDiv.find("[data-test='confirm_adding_urlLink']")
        expect(confirmOption.text()).toBe("Confirm")
    })
});