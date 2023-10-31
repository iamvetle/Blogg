import { mount } from '@vue/test-utils';
import newpost from './newpost.vue';
import EditorCard from '~/components/modules/Editor/EditorCard.vue';

// Mock the postCreateNewPost function

vi.stubGlobal("definePageMeta", () => {
    return null
} )

vi.stubGlobal("publishPost", () => {
    return null
} )


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

    it('Should emit event and should change text if poststate is differnt', async () => {
        // Mock successful API response

        const wrapper = mount(newpost, {
            global: {
                components:{
                    EditorCard
                },
                stubs: {
                    EditorCard:true
                }
            }
        });
        await wrapper.vm.$nextTick();


        /**
         * does nothing right now
         */
        vi.mock("~/composables/crud/postCreateNewPost", () => ({
            postCreateNewPost: () => {
                vi.fn().mockResolvedValue({ status: 200, data: true })
            }
        }));
        // ...

        // Trigger button click to call publishPost
        wrapper.vm.$emit("newPostMaterial", "ass");

        (wrapper.vm as any).postState = true

        await wrapper.vm.$nextTick();

        // Verify if postCreateNewPost was called
        // expect("publishPost").toHaveBeenCalled();
        expect(wrapper.emitted().newPostMaterial).toBeTruthy()
        expect(wrapper.text()).toContain("Nytt innlegg")
    });
});
