import SinglePostCommentSingle from './SinglePostCommentSingle.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';
import BaseButton from '~/components/base/BaseButton.vue';

let wrapper: any;
let pinia: any = createTestingPinia();

let generalStore: any;
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const mockDeleteComment = vi.fn()

let commentOneAuthor = "testusername"

const factory = () => {
    return shallowMount(SinglePostCommentSingle, {
        global: {
            plugins: [pinia],
            components: {
                BaseButton
            },
            mocks: {
                deleteComment:mockDeleteComment
            },
            stubs: {

            },
        },
        props: {
            comment: {
                content: "propcontent",
                date_published: "01-01-2009",
                author: commentOneAuthor
            }
        },
        slots: {}
    })
};

describe('testing the single comment in a list of comments in single post', () => {

    beforeEach(() => {
        generalStore = useGeneralStore(pinia);
        // postStore = usePostStore(pinia); 
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist, the single comment on an article', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should have comment prop', () => {
        wrapper = factory()

        expect(wrapper.props("comment")).toBeTruthy()
    })
    test('The text of the comment prop should be rendered', () => {
        wrapper = factory()

        expect(wrapper.text()).toContain("propcontent")
    })
    test('Should display the date the comment was published', () => {
        wrapper = factory()

        expect(wrapper.text()).toContain("01-01-2009")
    })
    test('Should display author username', () => {
        wrapper = factory()
        expect(wrapper.text()).toContain("testusername")
    })
    test('Should render the "button" for deleting the comment if the author is the loggedinuser', async () => {
        wrapper = factory()

        generalStore.username = "testusername"
        await wrapper.vm.$nextTick()

        console.log(wrapper.html())

        const buttonElement = wrapper.find("[data-test='delete-comment-button']")
        expect(buttonElement.exists()).toBe(true)
        expect(buttonElement.html()).toContain("Delete")
        expect(wrapper.text()).toContain("You")
    })
    test('Should not otherwise', async () => {
        wrapper = factory()
        generalStore.username = "somethingelse"
        await wrapper.vm.$nextTick()

        console.log(wrapper.html())

        const buttonElement = wrapper.find("[data-test='delete-comment-button']")
        expect(buttonElement.exists()).toBe(false)
        expect(wrapper.text()).not.toContain("You")
        expect(wrapper.html()).not.toContain("Delete")

    })
    test('There should be a delete comment function', () => {
        wrapper = factory()

        expect(wrapper.vm.deleteComment).toBeDefined()
    })

    test('The function should be called when the button is cliced', async () => {

        wrapper = factory()

        generalStore.username = "testusername"
        await wrapper.vm.$nextTick()

        console.log(wrapper.html())

        const buttonElement = wrapper.find("[data-test='delete-comment-button']")

    
        await buttonElement.trigger("click")

        expect(mockDeleteComment).toHaveBeenCalledOnce()
    })
});