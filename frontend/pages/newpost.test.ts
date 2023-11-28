import { mount } from '@vue/test-utils';
import newpost from './newpost.vue';
import EditorCard from '~/components/modules/Editor/EditorCard.vue';
import Modal from '~/components/utils/Modal.vue';

// Mock the postCreateNewPost function

vi.stubGlobal("definePageMeta", () => {
    return null
})

vi.stubGlobal("publishPost", () => {
    return null
})

const factory = () => {


    return mount(newpost, {
        global: {
            components: {
                EditorCard,
                Modal
            },
            stubs: {
                EditorCard: true
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
    });

    test('Should have an editor', async () => {
        const wrapper = factory()
        
        const editor = wrapper.findComponent({ name:"EditorCard" })

        expect(editor.exists()).toBe(true)
    })
    

});
