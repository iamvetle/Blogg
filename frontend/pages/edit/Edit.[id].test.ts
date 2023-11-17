import IdVue from './[id].vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import EditorCard from '~/components/modules/Editor/EditorCard.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(IdVue, {
        global: {
            plugins: [pinia],
            components: {
                EditorCard
            },
            mocks: {},
            stubs: {
                EditorCard: true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the edit page for single post page', () => {

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
    test('Should be an EditorCard component', () => {

    })


});