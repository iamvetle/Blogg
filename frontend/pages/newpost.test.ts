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

    test('Should show the modal component if "showModal" is true', async () => {
        const wrapper = factory()
        
        // Changing the variable to true
        ;(wrapper.vm as any).showModal = true 
        
        // Waiting for the DOM to update
        await wrapper.vm.$nextTick()

        // Tries to find the modal
        const modal = wrapper.findComponent({name:"Modal"})

        // Checks if the modal now can be found (exists)
        expect(modal.exists()).toBe(true)


    })

});
