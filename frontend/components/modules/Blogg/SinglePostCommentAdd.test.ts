import SinglePostCommentAdd from './SinglePostCommentAdd.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

// Components

import BaseTextareaInput from '~/components/base/BaseTextareaInput.vue';


// Stores

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';

let wrapper: any;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(SinglePostCommentAdd, {
        global: {
            plugins: [pinia],
            components: {
                BaseTextareaInput
            },
            mocks: {},
            stubs: {
                BaseTextareaInput: true
            },
        },
        attrs: {
            placeholder: "testholder"
        },
        props: {
            postId:2
        },
        slots: {}
    })
};

describe('', () => {

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
    test('Should have the BaseTextAreaInput component', () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: "BaseTextareaInput" }).exists()).toBe(true)
    })
    test('The should be a button', () => {
        wrapper = factory()
        expect(wrapper.find("button[data-test='submit_comment_button']").exists()).toBe(true)
    })
    test('There should be an area where for creating the text input for the comment', () => {
        wrapper = factory()
        const textArea_div = wrapper.find("div[data-test='input_comment_text']")
        expect(textArea_div.exists()).toBe(true)

        const textArea_component = textArea_div.findComponent({ name: "BaseTextareaInput" })
        expect(textArea_component.exists()).toBe(true)
    })
    test('There should be a function that tries to add the comment', () => {
        wrapper = factory()
        expect(wrapper.vm.tryAddComment).toBeDefined()
    })
    
    test('The submit button should have submit text', () => {
        wrapper = factory()

        const button = wrapper.get("[data-test='submit_comment_button']")

        expect(button.text()).toEqual("Submit")
    })
    test('Should have a prop that contains the post id', () => {
        wrapper = factory()

        
        expect(wrapper.props("postId")).toBe(2)
        expect(typeof wrapper.props("postId")).toBe("number")


      
    })

});

// toBe() for direct objcet comparision
// toEqual() for value comparision