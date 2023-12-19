import { mount } from '@vue/test-utils';
import newpost from './newpost.vue';
import EditorCard from '~/components/modules/Editor/EditorCard.vue';
import Modal from '~/components/utils/Modal.vue';

// Mock the postCreateNewPost function

vi.stubGlobal("definePageMeta", () => {
    return null
})


let mockPublish = vi.fn()
let wrapper:any;

const factory = () => {


    return mount(newpost, {
        global: {
            components: {
                EditorCard,
                Modal
            },
            stubs: {
                EditorCard: true
            },
            mocks: {
                publish:mockPublish
            }
        }
    });
}

/**
 * It is very difficult to mock a function or composable inside of another function.
 * So avoid that.
 * 
 * **Do not mock a function/composable inside of another function**
 */


describe('newPost', () => {
    afterEach(() => {
        vi.clearAllMocks(); // Clear the mocked function's call count after each test

        if (wrapper) {
            wrapper.unmount()
        }
    });

    test('Should have an editor', async () => {
        wrapper = factory()
        
        const editor = wrapper.findComponent({ name:"EditorCard" })

        expect(editor.exists()).toBe(true)
    })
    /**
     * ! its client only which makes things difficult
     */
    // test('When an new post material emit comes from the Editor card a function should be called', async () => {
    //     wrapper = factory() 

    //     const editorCard = wrapper.find("[data-test='editorcard']")

    //     await editorCard.trigger("newPostMaterial")
    //     await wrapper.vm.$nextTick()
        
    //     expect(mockPublish).toHaveBeenCalledOnce()
    // })
    

});
