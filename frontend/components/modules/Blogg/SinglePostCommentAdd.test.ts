import SinglePostCommentAdd from './SinglePostCommentAdd.vue';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseTextareaInput from '~/components/base/BaseTextareaInput.vue';
import BaseButton from '~/components/base/BaseButton.vue';

/**
 * Factory function to mount SinglePostCommentAdd component
 * with necessary dependencies and stubs for testing.
 * 
 * @returns {Wrapper} A wrapper for the SinglePostCommentAdd component.
 */
const factory = () => {
    return mount(SinglePostCommentAdd, {
        global: {
            plugins: [createTestingPinia()],
            components: { BaseTextareaInput, BaseButton },
            mocks: {},
            stubs: {},
        },
        attrs: { placeholder: "testholder" },
        props: { postId: 2 },
        slots: {}
    });
};

describe('SinglePostCommentAdd Component Tests', () => {
    let wrapper:any

    beforeEach(() => {
        // Common setup before each test
    });

    afterEach(() => {
        // Cleanup after each test
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Component should exist', () => {
        wrapper = factory();
        expect(wrapper.exists()).toBe(true);
    });

    test('Should contain BaseTextAreaInput component', () => {
        wrapper = factory();
        expect(wrapper.findComponent({ name: "BaseTextareaInput" }).exists()).toBe(true);
    });

    test('Should contain a submit button', () => {
        wrapper = factory();
        expect(wrapper.find("[data-test='submit_comment_button']").exists()).toBe(true);
    });

    test('Should render text input area for the comment', () => {
        wrapper = factory();
        const textArea_div = wrapper.find("div[data-test='input_comment_text']");
        expect(textArea_div.exists()).toBe(true);
        expect(textArea_div.findComponent({ name: "BaseTextareaInput" }).exists()).toBe(true);
    });

    test('Component should have a method for adding comments', () => {
        wrapper = factory();
        expect(wrapper.vm.tryAddComment).toBeDefined();
    });

    test('Submit button should display correct text', () => {
        wrapper = factory();
        const button = wrapper.get("[data-test='submit_comment_button']");
        expect(button.text()).toEqual("Submit");
    });

    test('Component should receive postId as a prop', () => {
        wrapper = factory();
        expect(wrapper.props("postId")).toBe(2);
        expect(typeof wrapper.props("postId")).toBe("number");
    });

    test('Should render a form with both button and textarea', () => {
        wrapper = factory();
        const formElement = wrapper.find("form[data-test='comment-add-form']");
        expect(formElement.find("button").exists()).toBe(true);
        expect(formElement.find("textarea").exists()).toBe(true);
    });

});
