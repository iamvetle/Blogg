import SingleArticleSingleComment from './SingleArticleSingleComment.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(SingleArticleSingleComment, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
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

    test('Should exist, the single comment on an article', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
});