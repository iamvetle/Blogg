import SinglePostCommentSingle from './SinglePostCommentSingle.vue';
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
    return shallowMount(SinglePostCommentSingle, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            comment: {
                content: "propcontent",
                date_published: "01-01-2009",
                author: "proptestusername"
            }
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

    test('Should exist, the single comment on an article', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should have comment prop', () => {
        expect(wrapper.props("comment")).toBeTruthy()
    })
    test('The text of the comment prop should be rendered', () => {
        expect(wrapper.text()).toContain("propcontent")
    })
    test('Should display the date the comment was published', () => {
        expect(wrapper.text()).toContain("01-01-2009")
    })
    test('Should display author username', () => {
        expect(wrapper.text()).toContain("proptestusername")
    })
});