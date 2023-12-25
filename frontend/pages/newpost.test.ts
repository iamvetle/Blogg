import { mount } from '@vue/test-utils';
import newpost from './newpost.vue';
// import EditorCard from '~/components/modules/Editor/EditorCard.vue';
// import { FilterDropdownTags } from '#build/components';
import { createTestingPinia } from '@pinia/testing';

// Mock the postCreateNewPost function

let mockGetAllTags = vi.fn()
let mockPublish = vi.fn()
let mockAction = vi.fn()
let mockHandleCharacters = vi.fn()
let wrapper:any;
let pinia = createTestingPinia()

const factory = () => {

    return mount(newpost, {
        global: {
            plugins:[pinia],
            components: {
            },
            stubs: {
                EditorCard: true,
                FilterDropdownTags:true,
                
            },
            mocks: {
                publish:mockPublish,
                getAllTags:mockGetAllTags,
                action:mockAction,
                handleCharacters:mockHandleCharacters
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

    beforeEach(() => {
        vi.stubGlobal("definePageMeta", () => {
            return null
        })
    })


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
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    })
    
 
    

});
