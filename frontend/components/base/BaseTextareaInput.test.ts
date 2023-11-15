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
});
