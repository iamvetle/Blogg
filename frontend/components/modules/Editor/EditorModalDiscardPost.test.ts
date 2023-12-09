import EditorModalDiscardPost from './EditorModalDiscardPost.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(EditorModalDiscardPost, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the modal used when pushing the cancel/discard button on editor', () => {

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        // postStore = usePostStore(pinia); 
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

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
    test('The discard button should trigger the discard event', async () => {
        wrapper = factory()
        console.log(wrapper.html())

        const discardButton = wrapper.find("[data-test='do_discard_option']")
        expect(discardButton.exists()).toBe(true)
        
        await discardButton.trigger("click")

        expect(wrapper.emitted("discardPost")).toBeTruthy()
    })
    test('The cancel button should trigger the cancel event', async () => {
        wrapper = factory()
        console.log(wrapper.html())

        const cancelButton = wrapper.find("[data-test='do_cancel_option']")
        expect(cancelButton.exists()).toBe(true)
        
        await cancelButton.trigger("click")

        expect(wrapper.emitted("cancel")).toBeTruthy()
    })
});