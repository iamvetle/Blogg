import ArticleTags from './ArticleTags.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';
import BaseTag from '~/components/base/BaseTag.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(ArticleTags, {
        global: {
            plugins: [pinia],
            components: {
                BaseTag
            },
            mocks: {},
            stubs: {},
        },
        props: {
            tags: [
                {
                    name: "candy"
                },
                {
                    name: "cat"
                }
            ]
        },
        slots: {}
    })
};

describe('', () => {

    vi.stubGlobal('definePageMeta', () => {
        return null
    });

    // vi.stubGlobal('useRoute', () => {
    //     return {
    //         params: {
    //             id: 1
    //         }
    //     }
    // });

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

    test('Should have a "tags" prop', () => {
      wrapper = factory()

      expect(wrapper.props("tags")).toBeTruthy()
    })
    test('Should have the basetag component, and there should be as many as there are tags prop', () => {
      wrapper = factory()

    const all_base_tags = wrapper.findAllComponents({ name:"BaseTag" })

    expect(all_base_tags).not.toHaveLength(0)
    
    const tags = wrapper.props("tags")
    
    expect(all_base_tags).toHaveLength(tags.length)


    })
});