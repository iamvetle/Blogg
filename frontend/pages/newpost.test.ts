import { flushPromises, mount } from '@vue/test-utils';
import newpost from '~/pages/newpost.vue';
import { EditorCard } from '~/components/modules/Editor/EditorCard.vue';

// Mock the postCreateNewPost function
let mockCreateNewPost = vi.fn()


vi.stubGlobal("definePageMeta", () => {
    return null
} )

describe('newPost', () => {
    afterEach(() => {
        vi.clearAllMocks(); // Clear the mocked function's call count after each test
    });

    it('calls publishPost and triggers alert on success', async () => {
        // Mock successful API response

        const wrapper = mount(newpost, {
            global: {
                mocks: [{
                    publishPost:mockCreateNewPost
            }],
                components:{
                    EditorCard
                },
                stubs: {
                    EditorCard:true
                }
            }
        });

        // Trigger button click to call publishPost
        await wrapper.findComponent({ name: "EditorCard"} ).trigger('newPostMaterial');

        // Wait for any promises to resolve

        await flushPromises()
        await wrapper.vm.$nextTick();

        // Verify if postCreateNewPost was called
        expect("publishPost").toHaveBeenCalled();

        // Verify if alert was triggered

        // You can also check any state changes, e.g., postState.value should be updated
        // For this, you may need to expose postState from your component
    });
});
