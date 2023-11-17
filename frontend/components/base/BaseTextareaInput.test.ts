import { mount } from '@vue/test-utils';
import BaseTextareaInput from './BaseTextareaInput.vue';

let wrapper:any
// Start describing the test
describe('BaseTextareaInput', () => {
    // Test if the component emits 'update:modelValue' with the correct value when input event is triggered
    it('emits update:modelValue event with the correct value', async () => {
        // Mount the component
        wrapper = mount(BaseTextareaInput, {
            props: {
                modelValue: '',
            },
        });

        // Find the textarea and set a value
        const textarea = wrapper.find('textarea');
        await textarea.setValue('Test Comment');

        // Assert that the component emitted the 'update:modelValue' event with the correct value
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Test Comment']);
    });
    test('Should have a minlength prop - that has a default value of three', () => {
        wrapper = mount(BaseTextareaInput, {
            props: {
                modelValue: '',
            },
        });

        const textarea = wrapper.find("textarea")

        expect(textarea.attributes("minlength")).toBe("3")    })
    test('Should be able to change the minlength prop value', () => {
        wrapper = mount(BaseTextareaInput, {
            props: {
                modelValue: '',
                minlength:10
            },
        });

        const textarea = wrapper.find("textarea")

        expect(textarea.attributes("minlength")).toBe("10")    })
    test('Should have a maxlength prop - that has a default value of 500', () => {
        wrapper = mount(BaseTextareaInput, {
            props: {
                modelValue: '',
            },
        });

        const textarea = wrapper.find("textarea")

        expect(textarea.attributes("maxlength")).toBe("500")    })
    test('Should be able to change the maxlength prop value', () => {
        wrapper = mount(BaseTextareaInput, {
            props: {
                modelValue: '',
                maxlength:15
            },
        });

        const textarea = wrapper.find("textarea")

        expect(textarea.attributes("maxlength")).toBe("15")
    })
});
